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
exports.getBandById = exports.destroyBand = exports.editBand = exports.createBand = exports.getAllBands = void 0;
const knexDB_1 = require("../../database/knexDB");
const createId_1 = require("../../helpers/createId");
const bandsManager_1 = require("../../business/bandsManager");
exports.getAllBands = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q || undefined;
        if (!q) {
            const message = "LISTA DE BANDAS E ARTISTAS CADASTRADOS NO SISTEMA";
            const result = yield (0, knexDB_1.db)("bands");
            res.status(200).send({ message, result });
        }
        if (q && q.length <= 1) {
            res.status(400);
            throw new Error('"400": Pesquisa deve ter ao menos 1 caracter');
        }
        if (q) {
            const [result] = yield (0, knexDB_1.db)("bands").where("NAME", "LIKE", `%${q}%`);
            if (!result) {
                res.status(404);
                throw new Error("'404': BANDA NÃO ENCONTRADA");
            }
            res.status(200).send({ message: "BANDA ENCONTRADA", result });
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
exports.createBand = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bandId = req.body.inputId || undefined;
        const bandName = req.body.inputName || undefined;
        const countryCode = req.body.inputCountry;
        const bandEmail = req.body.inputEmail || undefined;
        const passwordConfirm = req.body.inputPassword || undefined;
        const withoutSpace = bandName.replace(' ', '-');
        if (bandId) {
            res.status(400);
            throw new Error("'id' para banda deve ser gerado automaticamente");
        }
        if (!bandName) {
            res.status(400);
            throw new Error("'nome' da banda deve ser informado");
        }
        if (!countryCode) {
            res.status(400);
            throw new Error("'código do país' da banda deve ser informado");
        }
        if (bandEmail) {
            res.status(400);
            throw new Error("'email' para banda deve ser gerado automaticamente");
        }
        if (passwordConfirm) {
            res.status(400);
            throw new Error("'password' da banda deve ser gerado automático");
        }
        const [nameDBBands] = yield knexDB_1.db.raw(`SELECT name FROM bands WHERE name like "${bandName}"`);
        if (nameDBBands) {
            res.status(400);
            throw new Error('Nome já cadastrado no sistema.');
        }
        const [nameDBUsers] = yield knexDB_1.db.raw(`SELECT name FROM users WHERE name like "${bandName}"`);
        if (nameDBUsers) {
            res.status(400);
            throw new Error('Nome já cadastrado no sistema');
        }
        const createBand = {
            id: (0, createId_1.createId)(bandId),
            name: bandName,
            nickname: (0, bandsManager_1.createBandNickname)(countryCode, withoutSpace),
            email: (0, bandsManager_1.createBandEmail)(bandEmail, withoutSpace),
            password: (0, bandsManager_1.createBandPassword)(passwordConfirm, withoutSpace)
        };
        yield (0, knexDB_1.db)("users").insert(createBand);
        const createBandAccount = {
            id: createBand.id,
            name: createBand.name
        };
        yield (0, knexDB_1.db)("bands").insert(createBandAccount);
        res.status(201).json({ message: "banda cadastrada com sucesso" });
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
exports.editBand = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bandId = req.params.id;
        const bandName = req.body.inputName || undefined;
        const countryCode = req.body.inputCountry;
        const bandEmail = req.body.inputEmail || undefined;
        const passwordConfirm = req.body.inputPassword || undefined;
        const [bandsExists] = yield (0, knexDB_1.db)("bands").where("id", "LIKE", `${bandId}`);
        if (!bandsExists) {
            res.status(404);
            throw new Error("404: Banda não cadastrada");
        }
        const [band4edit] = yield knexDB_1.db.raw(`SELECT * FROM bands WHERE id="${bandId}"`);
        if (band4edit) {
            band4edit.id = bandId,
                band4edit.name = bandName || band4edit.name;
        }
        yield (0, knexDB_1.db)("bands").update(band4edit).where({ id: `${bandId}` });
        const [UBand4edit] = yield knexDB_1.db.raw(`SELECT * FROM users WHERE id="${bandId}"`);
        if (UBand4edit) {
            UBand4edit.id = bandId,
                UBand4edit.name = bandName || band4edit.name;
            UBand4edit.nickname = (0, bandsManager_1.createBandNickname)(countryCode, bandName);
            UBand4edit.email = (0, bandsManager_1.createBandEmail)(bandEmail, bandName);
            UBand4edit.created_at = UBand4edit.created_at;
        }
        yield (0, knexDB_1.db)("users").update(UBand4edit).where({ id: `${bandId}` });
        res.status(200).send({ message: "banda atualizado com sucesso" });
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
exports.destroyBand = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id4delete = req.params.id;
        const band4delete = yield (0, knexDB_1.db)("bands").where({ id: id4delete });
        if (!band4delete) {
            res.status(404);
            throw new Error("'404': banda não cadastrada");
        }
        yield (0, knexDB_1.db)("bands").delete().where({ id: `${id4delete}` });
        res.status(200).send({ message: 'banda deletado com sucesso' });
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
exports.getBandById = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id4Search = req.params.id;
        const [result] = yield knexDB_1.db.raw(`
        SELECT * FROM bands 
        INNER JOIN users
        ON users.id = bands.id
        where bands.id = '${id4Search}'`);
        if (!result || result === null || result === undefined) {
            res.status(404);
            throw new Error("banda  não Cadastrada , verifique o 'id' de busca");
        }
        else {
            res.status(200).send({ result: result });
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
//# sourceMappingURL=bandsController.js.map