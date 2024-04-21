import usuarios from "@dbModels/usuarios.model";
import { Usuario, UsuarioCreationAttributes } from "@typesApp/entities/UsuarioTypes";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY;

export async function login(usuario: string, pass: string, mantenerSesion: boolean) {
    const user = await getUserByEmailOrUsername(usuario);
    if (user) {
        const isPasswordCorrect = await bcrypt.compare(pass, user.pass);
        if (isPasswordCorrect) {
            if (SECRET_KEY) {
                const expiresIn = mantenerSesion ? '7d' : '1h'; // Si mantenerSesion es verdadero, el token expira en 7 días. De lo contrario, expira en 1 hora.
                return jwt.sign({ id_usuario: user.id_usuario }, SECRET_KEY, { expiresIn });
            }
        }
    }
    return null;
}
// ahora para registrarme
export async function register(usuario: UsuarioCreationAttributes) {
    const user = await usuarios.create(usuario);
    return user.toJSON() as Usuario;
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
    // Add your email validation logic here
    return identifier.includes('@');
}