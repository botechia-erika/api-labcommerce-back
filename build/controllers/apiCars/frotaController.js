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
exports.destroyProduct = exports.getProductById = exports.editProductById = exports.getAllCars = exports.createCar = void 0;
const knexDB_1 = require("../../models/knexDB");
const createId_1 = require("../../helpers/createId");
const matchDescriptionCategory_1 = require("../../helpers/matchDescriptionCategory");
exports.createCar = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newName = req.body.modelo + " " + req.body.marca + " " + req.body.ano;
        const newPlaca = req.body.placa;
        const newImage = req.body.image_url;
        const newPrice = req.body.price;
        if (typeof newName != typeof "string") {
            res.status(400);
            throw new Error('400 nome do deve seguir o formato "MODELO MARCA ANO" ');
        }
        if (typeof newPlaca !== typeof "string") {
            res.status(400);
            throw new Error("400: placa deve ser alfa numerica");
        }
        if (newPlaca && !newPlaca.match(/[A-Z]{3}[-][0-9]{4}/g)) {
            res.status(400);
            throw new Error("400: placa deve seguir o padrão AAA-0000");
        }
        if (!newImage.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
            res.status(400);
            throw new Error("400: imagem deve corresponder a endereço URL VALIDO");
        }
        const newProduct = {
            id: (0, createId_1.createId)(newPlaca),
            name: newName,
            image_url: newImage,
            description: (0, matchDescriptionCategory_1.matchDescriptionCategory)(newPrice),
            price: newPrice
        };
        yield (0, knexDB_1.db)("products").insert(newProduct);
        res.status(201).send("produto cadastrado com sucesso");
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
exports.getAllCars = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.q;
        if (searchTerm === undefined) {
            const message = "LISTA DE PRODUTOS CADASTRADO DO SISTEMA";
            const result = yield knexDB_1.db.raw(`SELECT * FROM products WHERE description LIKE "Light" OR description LIKE "Hatch" OR description LIKE "Sedan" OR description LIKE "Prime" OR description LIKE "Lux"`);
            const frotaDB = result;
            res.status(200).send({ message, result });
        }
        else {
            const searchTerm = req.query.q;
            if (searchTerm && searchTerm.length < 0 || searchTerm === "") {
                res.status(400);
                throw new Error('Pesquisa deve ter ao menos 1 caracter');
            }
            const [result] = yield (0, knexDB_1.db)("products").where("name", "LIKE", `%${searchTerm}%`);
            if (!result) {
                res.status(404);
                throw new Error("404: NOME do Produto NÃO Encontrado");
            }
            res.status(200).send({ result: [result], message: "PRODUTO ENCONTRADO" });
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
exports.editProductById = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const nameSelect = req.body.name;
        const newImg = req.body.image_url;
        const newPrice = req.body.price;
        const productExists = yield (0, knexDB_1.db)("products").where("id", "LIKE", `${id}`);
        if (!productExists) {
            res.status(404);
            throw new Error("404: Produto não cadastrado");
        }
        if (nameSelect !== undefined) {
            const confereNome = yield knexDB_1.db.raw(`SELECT name FROM products WHERE id="id"`);
            if (nameSelect && confereNome !== nameSelect) {
                res.status(400);
                throw new Error("Nome do produto cadastrado não deve ser alterado");
            }
        }
        if (newImg !== undefined) {
            if (!newImg.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)) {
                res.status(400);
                throw new Error("400: imagem deve corresponder a endereço URL VALIDO");
            }
        }
        if (newPrice) {
            if (newPrice && typeof newPrice !== typeof Number) {
                res.status(400);
                throw new Error("400: Preço atualizado deve ser valor numerico valido");
            }
        }
        const [product4edit] = yield knexDB_1.db.raw(`SELECT * FROM products WHERE id="${id}"`);
        if (product4edit) {
            product4edit.id = id,
                product4edit.name = nameSelect || product4edit.name,
                product4edit.description = (0, matchDescriptionCategory_1.matchDescriptionCategory)(product4edit.price),
                product4edit.image_url = newImg || product4edit.image_url,
                product4edit.price = newPrice || product4edit.price;
        }
        yield (0, knexDB_1.db)("products").update(product4edit).where({ id: `${id}` });
        res.status(200).send({ message: "produto atualizado com sucesso", result: product4edit });
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
exports.getProductById = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.idDetails;
        const result = yield knexDB_1.db.raw(`SELECT * FROM products WHERE id="${id}"`);
        if (!result) {
            res.status(404);
            throw new Error("PRODUTO  não Cadastrado , verifique o 'id'");
        }
        else {
            res.status(200).send({ product: result });
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
exports.destroyProduct = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const productDelete = yield (0, knexDB_1.db)("products").where({ id: id });
        if (!productDelete) {
            throw new Error("product  nao encontrado");
        }
        yield (0, knexDB_1.db)("products").delete().where({ id: `${id}` });
        res.status(200).send({ message: 'product deletado com sucesso' });
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
//# sourceMappingURL=frotaController.js.map