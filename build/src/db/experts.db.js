"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sequelize = new sequelize_typescript_1.Sequelize((_a = process.env.DB_NAME) !== null && _a !== void 0 ? _a : "", (_b = process.env.DB_USER) !== null && _b !== void 0 ? _b : "", process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql"
});
/*
async function connect() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

connect();

connect();
*/ 
