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
exports.destroyUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const knexDB_1 = require("../models/knexDB");
const getIdB_1 = require("../helpers/getIdB");
exports.getAllUsers = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.q;
        if (searchTerm === undefined) {
            const message = "LISTA DE USERS CADASTRADO DO SISTEMA";
            const result = yield (0, knexDB_1.db)("users");
            res.status(200).json({ result });
        }
        else {
            const [result] = yield (0, knexDB_1.db)("users").where("name", "LIKE", `%${searchTerm}%`);
            if (![result] || result == null) {
                res.status(404).json({ message: "USER NÃO ENCONTRADO" });
            }
            else {
                res.status(200).json({ result: [result], message: "USER ENCONTRADO" });
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
exports.createUser = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newId = req.body.id;
        const name = req.body.name;
        const nickname = req.body.nickname;
        const email = req.body.email;
        const password = req.body.password;
        const id = (0, getIdB_1.createId)(newId);
        if (typeof name !== "string") {
            res.status(400).send({ message: 'nome invalido' });
        }
        if (typeof nickname !== "string") {
            res.status(400).send('nickname alfa-numerico');
        }
        if (typeof email !== "string") {
            res.status(400).send('email invalido');
        }
        if (typeof password !== "string") {
            res.status(400).send("outra senha essa é invalida tente alfa-numerico");
        }
        const newAuthor = {
            id,
            name,
            nickname,
            email,
            password
        };
        yield (0, knexDB_1.db)("users").insert(newAuthor);
        res.status(201).json({ message: "usuario cadastrado com sucesso" });
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
exports.destroyUser = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idToDelete = req.params.id;
        const [users] = yield (0, knexDB_1.db)("users").where({ id: idToDelete });
        if (!users) {
            throw new Error("usuario  nao encontrado");
        }
        yield (0, knexDB_1.db)("users").delete().where({ id: idToDelete });
        res.status(200).json({ message: 'users deletado com sucesso' });
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
//# sourceMappingURL=usersController.js.map