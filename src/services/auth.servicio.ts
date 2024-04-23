import usuarios from "@dbModels/usuarios.model";
import { isUserAdmin } from "@services/admins.servicio"
import { Usuario, UsuarioCreationAttributes } from "@typesApp/entities/UsuarioTypes";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY;

export async function login(usuario: string, pass: string, mantenerSesion: boolean) {
    let user: Usuario | null = null;
    let payload: object = {};

    try {
        if (isEmail(usuario)) {
            user = await getUserByEmailOrUsername(usuario);
        } else {
            const userInstance = await usuarios.findOne({ where: { usuario } });
            user = userInstance ? userInstance.dataValues as Usuario : null;
        }

        if (!user) return { error: 'Credenciales inválidas' };
        if (user && user.pass && pass) {
            const isPasswordCorrect = await bcrypt.compare(pass, user.pass);
            if (isPasswordCorrect) {
                if (SECRET_KEY) {

                    const expiresIn = mantenerSesion ? '7d' : 5;
                    const token = jwt.sign({ id_usuario: user.id_usuario, admin: await isUserAdmin(user.id_usuario || 0) }, SECRET_KEY, { expiresIn });
                    //console.log(jwt.verify(token, SECRET_KEY) as any);
                    return { token };
                }
            } else {
                return { error: 'Contraseña incorrecta' };
            }
        }
    } catch (error: any) {
        console.log(error);
        return { error: error.message };
    }
    return { error: 'Credenciales inválidas' };
}
// ahora para registrarme
export async function register(usuario: UsuarioCreationAttributes): Promise<UsuarioCreationAttributes | any> {
    const userExists = await getUserByEmailOrUsername(usuario.email || ''); // Handle null case by providing a default empty string
    if (userExists) {
        return { error: 'El usuario ya existe' };
    }
    if (!usuario.email || !usuario.usuario || !usuario.pass) {
        return { error: 'Faltan datos' };
    }

    if (usuario.pass.length < 6) {
        return { error: 'La contraseña debe tener al menos 6 caracteres' };
    }

    if (usuario.usuario.length < 6) {
        return { error: 'El usuario debe tener al menos 6 caracteres' };
    }

    if (usuario.usuario.length > 20) {
        return { error: 'El usuario no puede tener más de 20 caracteres' };
    }

    if (usuario.usuario.includes(' ')) {
        return { error: 'El usuario no puede contener espacios' };
    }

    if (!isEmail(usuario.email)) {
        return { error: 'El email no es válido' };
    }

    const hashedPass = await bcrypt.hash(usuario.pass, 10);
    usuario.pass = hashedPass;


    try {
        const user = await usuarios.create({
            email: usuario.email,
            usuario: usuario.usuario,
            pass: usuario.pass

        });
        return user.toJSON();
    } catch (e: any) {
        return { error: e.message };
    }

}

export async function verifyToken(token: string) {
    try {
        const SECRET_KEY = process.env.SECRET_KEY || ''; // Reemplaza 'your-secret-key' con tu clave secreta
        jwt.verify(token, SECRET_KEY);
        return { valid: true };
    } catch (error: any) {
        return { valid: false, error: error.message };
    }
}

export async function isAdminToken(token: string) {
    try {
        const SECRET_KEY = process.env.SECRET_KEY || ''; // Reemplaza 'your-secret-key' con tu clave secreta
        const decoded = jwt.verify(token, SECRET_KEY) as any;
        return { isAdmin: decoded.admin || false };
    } catch (error: any) {
        return { error: error.message };
    }
}


async function getUserByEmailOrUsername(identifier: string): Promise<Usuario | null> {
    let user: Usuario | null = null;
    if (isEmail(identifier)) {
        user = await usuarios.findOne({ where: { email: identifier } }) as Usuario | null;
    } else {
        user = await usuarios.findOne({ where: { usuario: identifier } }) as Usuario | null;
    }
    return user;
}

function isEmail(identifier: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(identifier);
}