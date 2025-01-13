import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admins from '@models/usuarios/admins.model';
import Usuarios from "@models/usuarios/usuario.model";
import { Usuario, UsuarioAtributosCreacion } from "@typesApp/usuarios/usuario.type";
import { SECRET_KEY, BY_SALT, SECRET_REFRESH_KEY } from "@db/config";

import { UUID } from 'crypto';

const roleTableMap: { [key: string]: any } = {
    admin: Admins,
    // Agrega otros roles y sus tablas aquí
    // ejemplo: "editor": Editors,
    // "manager": Managers,
};

export async function isUserInRole(userId: UUID, role: string): Promise<boolean> {
    const roleTable = roleTableMap[role];
    if (!roleTable) {
        throw new Error(`El rol ${role} no está definido en el mapa de roles`);
    }

    const user = await roleTable.findOne({
        where: { id_usuario: userId },
    });

    return user !== null;
}

export async function getUserRole(userId: UUID): Promise<string | null> {
    for (const role of Object.keys(roleTableMap)) {
        const isInRole = await isUserInRole(userId, role);
        if (isInRole) {
            return role; // Devuelve el primer rol encontrado
        }
    }
    return null; // Si no pertenece a ningún rol
}

export async function login(usuario: string, pass: string, mantenerSesion: boolean): Promise<{ accessToken: string, refreshToken: string }> {
    let user: Usuario | null = null;

    if (isEmail(usuario)) {
        user = await getUserByEmailOrUsername(usuario);
    } else {
        const userInstance = await Usuarios.findOne({ where: { usuario } });
        //console.log(userInstance);
        user = userInstance ? userInstance.dataValues as Usuario : null;
    }

    if (!user) {
        throw new Error('Credenciales inválidas');
    }

    const isPasswordCorrect = await bcrypt.compare(pass, user.pass);
    if (!isPasswordCorrect) {
        throw new Error('Credenciales inválidas');
    }

    const userRole = await getUserRole(user.id_usuario || 0);
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
            rol: userRole
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

export async function register(usuario: UsuarioAtributosCreacion): Promise<UsuarioAtributosCreacion> {
    const userExists = await getUserByEmailOrUsername(usuario.email || '');
    if (userExists) {
        throw new Error('El usuario ya existe');
    }

    const { email, usuario: username, pass } = usuario;

    if (!email || !username || !pass) {
        throw new Error('Faltan datos');
    }

    if (pass.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    if (username.length < 6 || username.length > 20) {
        throw new Error('El usuario debe tener entre 6 y 20 caracteres');
    }

    if (username.includes(' ')) {
        throw new Error('El usuario no puede contener espacios');
    }

    if (!isEmail(email)) {
        throw new Error('El email no es válido');
    }

    const hashedPass = await bcrypt.hash(pass, Number(BY_SALT));
    usuario.pass = hashedPass;

    try {
        const user = await Usuarios.create({
            email: usuario.email,
            usuario: usuario.usuario,
            pass: usuario.pass
        });
        return user.toJSON();
    } catch (error) {
        throw new Error('Error al crear el usuario');
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

    const userRole = await getUserRole(payload.id_usuario || 0);
    if (!userRole) {
        throw new Error('El usuario no tiene un rol asignado');
    }


    const newAccessToken = jwt.sign(
        {
            id_usuario: payload.id_usuario,
            rol: userRole
        },
        SECRET_KEY!,
        { expiresIn: '15m' }
    );

    return { token: newAccessToken };
}

async function getUserByEmailOrUsername(identifier: string): Promise<Usuario | null> {
    if (isEmail(identifier)) {
        return await Usuarios.findOne({ where: { email: identifier } }) as Usuario | null;
    } else {
        return await Usuarios.findOne({ where: { usuario: identifier } }) as Usuario | null;
    }
}

function isEmail(identifier: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(identifier);
}
