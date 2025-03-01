import { Sequelize } from "sequelize";
import { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./config";
import fs from 'fs';
import path from 'path';

// Configurar el archivo de log
const logFile = fs.createWriteStream(path.join(__dirname, 'sequelize.log'), { flags: 'a' });

const sequelize = new Sequelize({
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    dialect: DB_DIALECT as any, // Usa la variable de entorno para el dialecto (postgres, mysql, etc.)
    logging: (msg) => logFile.write(msg + '\n'), // Escribe cada mensaje en el archivo de log
    define: {
        freezeTableName: true, // No cambia los nombres de tablas
        timestamps: false,     // Desactiva timestamps automáticos
    },
    dialectOptions: {
        ...(DB_DIALECT === 'mysql' && {
            // Opciones para MySQL, como SSL u otros parámetros
        }),
        ...(DB_DIALECT === 'postgres' && {
            // Opciones específicas de PostgreSQL
        })
    }
});

// Función para sincronizar la base de datos
export const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synchronized');
    } catch (err) {
        console.error('Error synchronizing database', err);
    }
};

export default sequelize;
