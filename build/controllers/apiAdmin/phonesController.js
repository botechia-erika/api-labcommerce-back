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
exports.createPhone = exports.getPhonesById = exports.getAllPhones = void 0;
const knexDB_1 = require("../../models/knexDB");
const Phone_1 = require("../../models/Phone");
const createId_1 = require("../../helpers/createId");
exports.getAllPhones = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        let phonesDB;
        if (!q) {
            phonesDB = yield (0, knexDB_1.db)("*").from("phones");
            const phones = phonesDB.map((phoneDB) => (new Phone_1.Phone(phoneDB.id, phoneDB.user_id, phoneDB.phone_number)));
            res.status(200).json(phones);
        }
        const [result] = yield (0, knexDB_1.db)("phones").where("phone_number", 'LIKE', `%${q}%`);
        if (!result) {
            res.status(404);
            throw new Error("'404': telefone não encontrado");
        }
        if (result) {
            phonesDB = [result];
            const phones = phonesDB.map((phoneDB) => (new Phone_1.Phone(phoneDB.id, phoneDB.user_id, phoneDB.phone_number)));
            res.status(200).json({ message: "telefone ENCONTRADO", phones });
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
exports.getPhonesById = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSearched = req.params.id;
        const [phoneDB] = yield knexDB_1.db.raw(`SELECT * FROM phones WHERE id='${idSearched}'`);
        if (!phoneDB) {
            res.status(404);
            throw new Error("'404': id não encontrado");
        }
        const phone = new Phone_1.Phone(phoneDB.id, phoneDB.user_id, phoneDB.phone_number);
        res.status(200).json(phone);
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
exports.createPhone = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createParamsId = req.body.inputId;
        const userId = req.body.inputUserId;
        const phoneNumber = req.body.inputTelephone;
        if (createParamsId !== undefined) {
            res.status(400);
            throw new Error("'400': O ID para telefones deve ser gerado automaticamente");
        }
        else {
            const [userExists] = yield knexDB_1.db.raw(`SELECT id FROM users WHERE id="${userId}"`);
            const newPhone = new Phone_1.Phone((0, createId_1.createId)(createParamsId), userExists, phoneNumber);
            const insertNewPhone = yield knexDB_1.db.raw(`INSERT INTO phones`);
            res.status(201).json({ message: "telefone cadastrado com sucesso" });
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
//# sourceMappingURL=phonesController.js.map