"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aerolineas_route_1 = __importDefault(require("../routes/aerolineas.route"));
const app = (0, express_1.default)();
app.get('/', (_, res) => {
    res.send('Hello World!');
});
app.use('/api/v1/', aerolineas_route_1.default);
exports.default = app;
