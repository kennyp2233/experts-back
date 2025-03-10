import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admins from '@models/usuarios/admins.model';
import Usuarios from "@models/usuarios/usuario.model";
import { UsuarioAtributos, UsuarioAtributosCreacion } from "@typesApp/usuarios/usuario.type";
import { SECRET_KEY, BY_SALT, SECRET_REFRESH_KEY } from "@db/config";

import { UUID } from 'crypto';
import { getUserRoles } from './usuarios.servicio';
import Pendiente from '@models/usuarios/pendiente.model';
import ClienteRol from '@models/usuarios/clientes.model';
import FincaRol from '../../models/usuarios/fincas.model';
import sequelize from '@db/experts.db';



export async function login(usuario: string, pass: string, mantenerSesion: boolean): Promise<{ accessToken: string, refreshToken: string }> {
    let user: UsuarioAtributos | null = null;

    if (isEmail(usuario)) {
        user = await getUserByEmailOrUsername(usuario);
    } else {
        const userInstance = await Usuarios.findOne({ where: { usuario } });
        //console.log(userInstance);
        user = userInstance ? userInstance.dataValues as UsuarioAtributos : null;
    }

    if (!user) {
        throw new Error('Credenciales inválidas');
    }

    const isPasswordCorrect = await bcrypt.compare(pass, user.pass);
    if (!isPasswordCorrect) {
        throw new Error('Credenciales inválidas');
    }

    const userRole = await getUserRoles(user.id_usuario || 0);
    if (!userRole) {
        throw new Error('El usuario no tiene un rol asignado');
    }

    if (!SECRET_KEY) {
        throw new Error('Clave secreta no configurada');
    }

    if (!SECRET_REFRESH_KEY) {
        throw new Error('Clave secreta de refresco no configurada');
    }

    const accessTokenExpiresIn = '15m'; // Token de acceso válido por 15 minutos
    const refreshTokenExpiresIn = mantenerSesion ? '7d' : '1h'; // Token de refresco

    const accessToken = jwt.sign(
        {
            id_usuario: user.id_usuario,
            roles: userRole
        },
        SECRET_KEY,
        { expiresIn: accessTokenExpiresIn }
    );

    const refreshToken = jwt.sign(
        {
            id_usuario: user.id_usuario
        },
        SECRET_REFRESH_KEY, // Nueva clave secreta para el token de refresco
        { expiresIn: refreshTokenExpiresIn }
    );

    // Opcional: Guardar el refreshToken en la base de datos si deseas invalidarlo posteriormente

    return { accessToken, refreshToken };
}

export async function register(
    usuario: string,
    email: string,
    pass: string,
    nombre: string,
    empresa: string,
    telefono: string,
    selectedRole: string,
    additionalData: any = {}
): Promise<{ ok: boolean, msg: string }> {
    const transaction = await sequelize.transaction();

    try {
        if (!email || !usuario || !pass) {
            throw new Error('Faltan datos');
        }

        if (pass.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }

        if (usuario.length < 6 || usuario.length > 20) {
            throw new Error('El usuario debe tener entre 6 y 20 caracteres');
        }

        if (usuario.includes(' ')) {
            throw new Error('El usuario no puede contener espacios');
        }

        if (!isEmail(email)) {
            throw new Error('El email no es válido');
        }

        // Crear el usuario base
        const user = await Usuarios.create({
            usuario,
            email,
            pass: await bcrypt.hash(pass, Number(BY_SALT))
        }, { transaction }) as any;

        // Crear perfil si tienes una tabla para ello
        // await Perfiles.create({ id_usuario: user.id_usuario, nombre, telefono }, { transaction });

        // Asignar rol pendiente a todos los usuarios nuevos
        await Pendiente.create({
            id_usuario: user.id_usuario
        }, { transaction });

        // Asignar rol específico según lo solicitado
        if (selectedRole === 'cliente') {
            await ClienteRol.create({
                id_usuario: user.id_usuario,
                empresa
            }, { transaction });
        } else if (selectedRole === 'finca') {
            await FincaRol.create({
                id_usuario: user.id_usuario,
                codigo_finca: additionalData.codigoFinca,
                direccion_finca: additionalData.direccionFinca,
                cliente_previo: additionalData.clientePrevio || false
            }, { transaction });
        }

        await transaction.commit();
        return { ok: true, msg: 'Usuario registrado correctamente' };
    } catch (error: any) {
        await transaction.rollback();
        return { ok: false, msg: `Error al registrar: ${error.message}` };
    }
}
export async function verifyToken(token: string): Promise<{ valid: boolean }> {
    if (!SECRET_KEY) {
        throw new Error('Clave secreta no configurada');
    }

    try {
        jwt.verify(token, SECRET_KEY);
        return { valid: true };
    } catch (error) {
        throw new Error('Token inválido');
    }
}
export async function refreshToken(token: string): Promise<{ token: string }> {
    const payload = jwt.verify(token, SECRET_REFRESH_KEY!) as { id_usuario: UUID };

    const userRole = await getUserRoles(payload.id_usuario || 0);
    if (!userRole) {
        throw new Error('El usuario no tiene un rol asignado');
    }


    const newAccessToken = jwt.sign(
        {
            id_usuario: payload.id_usuario,
            roles: userRole
        },
        SECRET_KEY!,
        { expiresIn: '15m' }
    );

    return { token: newAccessToken };
}

async function getUserByEmailOrUsername(identifier: string): Promise<UsuarioAtributos | null> {
    if (isEmail(identifier)) {
        return await Usuarios.findOne({ where: { email: identifier } }) as UsuarioAtributos | null;
    } else {
        return await Usuarios.findOne({ where: { usuario: identifier } }) as UsuarioAtributos | null;
    }
}

function isEmail(identifier: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(identifier);
}
