"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aerolineas_moldel_1 = __importDefault(require("../model/aerolineas.moldel"));
class Aerolinea {
    getAerolineas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const aerolineasList = yield aerolineas_moldel_1.default.findAll();
                return aerolineasList.map((aerolinea) => aerolinea.toJSON());
            }
            catch (error) {
                throw error;
            }
        });
    }
    getAerolinea(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const aerolinea = yield aerolineas_moldel_1.default.findByPk(id);
                return aerolinea ? aerolinea.toJSON() : null;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createAerolinea(aerolinea) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield aerolineas_moldel_1.default.create(aerolinea);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateAerolinea(id, aerolinea) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const aerolineaToUpdate = yield aerolineas_moldel_1.default.findByPk(id);
                if (aerolineaToUpdate) {
                    yield aerolineas_moldel_1.default.update(aerolinea, {
                        where: {
                            id_aerolinea: id
                        }
                    });
                    return aerolinea;
                }
                return null;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteAerolinea(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const aerolineaToDelete = yield aerolineas_moldel_1.default.findByPk(id);
                if (aerolineaToDelete) {
                    const deletedAerolinea = yield aerolineas_moldel_1.default.destroy({
                        where: {
                            id_aerolinea: id
                        }
                    });
                    return deletedAerolinea;
                }
                else {
                    throw new Error(`Aerolinea with id ${id} not found`);
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = Aerolinea;
