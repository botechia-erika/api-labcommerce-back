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
exports.destroyProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.editProductById = void 0;
const knexDB_1 = require("../models/knexDB");
const getIdB_1 = require("../helpers/getIdB");
exports.editProductById = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newid = req.params.id;
        const newName = req.body.name;
        const newDescription = req.body.description;
        const newImageUrl = req.body.image_url;
        const newPrice = req.body.price;
        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400);
                throw new Error("Nome do produto deve ser do tipo string");
            }
        }
        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                res.status(400);
                throw new Error("Descrição deve ser do tipo string");
            }
        }
        if (newImageUrl !== undefined) {
            if (typeof newImageUrl !== "string") {
                res.status(400);
                throw new Error("Nova imagem deve ser do tipo string");
            }
        }
        const [product4edit] = yield knexDB_1.db.raw(`SELECT * FROM products WHERE products.id="${newid}"`);
        if ([product4edit]) {
            product4edit.id = newid,
                product4edit.name = newName || product4edit.name,
                product4edit.description = newDescription || product4edit.description,
                product4edit.image_url = newImageUrl || product4edit.image_url,
                product4edit.price = newPrice || product4edit.price;
        }
        yield (0, knexDB_1.db)("products").update(product4edit).where({ id: `${newid}` });
        res.status(201).send({ message: "produto atualizado com sucesso", result: product4edit });
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
exports.createProduct = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newId = req.body.newId;
        const name = req.body.name;
        const description = req.body.description;
        const image_url = req.body.image_url;
        const price = req.body.price;
        if (typeof name != typeof "string") {
            res.status(400).send({ message: 'nome do produto é invalido' });
        }
        if (typeof description != typeof "string") {
            res.status(400).send('description deve ser categoria de produto valida');
        }
        if (typeof image_url != typeof "string") {
            res.status(400).send('url da imagem deve ser valida');
        }
        if (typeof price == undefined) {
            res.status(400).send("price deve ser numerico");
        }
        const id = (0, getIdB_1.createId)(newId);
        const newAccount = {
            id,
            name,
            description,
            image_url,
            price
        };
        yield (0, knexDB_1.db)("products").insert(newAccount);
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
exports.getAllProducts = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.q;
        if (searchTerm === undefined) {
            const message = "LISTA DE PRODUTOS CADASTRADO DO SISTEMA";
            const result = yield (0, knexDB_1.db)("products");
            res.status(200).send({ result });
        }
        else {
            const [result] = yield (0, knexDB_1.db)("products").where("name", "LIKE", `%${searchTerm}%`);
            if (![result] || result == null) {
                res.send({ message: "PRODUTO NÃO ENCONTRADO" });
            }
            else {
                res.status(200).send({ result: [result], message: "PRODUTO ENCONTRADO" });
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
exports.getProductById = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const [result] = yield knexDB_1.db.raw(`SELECT * FROM products WHERE id="${id}"`);
        if (!result) {
            res.status(200).send({ message: "PRODUTO  não encontrado" });
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
        const [productDelete] = yield (0, knexDB_1.db)("products").where({ id: id });
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
//# sourceMappingURL=productsController.js.map