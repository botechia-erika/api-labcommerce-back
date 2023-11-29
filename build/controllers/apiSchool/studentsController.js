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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllStudents = void 0;
const knexDB_1 = require("../../database/knexDB");
exports.getAllStudents = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.q;
        if (searchTerm === undefined) {
            const message = "LISTA DE USERS CADASTRADO DO SISTEMA";
            const result = yield (0, knexDB_1.db)("users");
            res.status(200).json(result);
        }
        else {
            const [result] = yield (0, knexDB_1.db)("users").where("name", "LIKE", `%${searchTerm}%`);
            if (![result] || result == null) {
                res.status(404).json({ message: "USER NÃO ENCONTRADO" });
            }
            else {
                res.status(200).json({ result, message: "USER ENCONTRADO" });
            }
        }
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
exports.getUserById = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (id === "" || id === undefined) {
            res.json({ message: "ID DE USUARIO DEVE SER INFORMADO PARA BUSCA" });
        }
        else {
            const [result] = yield knexDB_1.db.raw(`SELECT * FROM users WHERE id="${id}"`);
            if (result && result != undefined) {
                res.status(200).json({ message: "USUARIO ENCONTRADO", result: result });
            }
            else {
                res.status(404).json({ message: "USER não encontrado" });
            }
        }
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
//# sourceMappingURL=studentsController.js.map