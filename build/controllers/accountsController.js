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
exports.editAccount = exports.createAccount = exports.destroyAccount = exports.getAccountById = exports.getAllAcounts = void 0;
const accounts_1 = require("../dataTS/accounts");
const getIdB_1 = require("../helpers/getIdB");
exports.getAllAcounts = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        if (q === undefined) {
            res.status(200).json(accounts_1.accounts);
        }
        else {
            function buscaAccountOwner(accounts, q) {
                return accounts.filter((account) => {
                    if (account.ownerName.toUpperCase().includes(q.toUpperCase())) {
                        return account;
                    }
                });
            }
            const [result] = buscaAccountOwner(accounts_1.accounts, q);
            if (!result) {
                res.status(404);
                throw new Error("404 owner NÃO encontrado, insira um nome cadastrado");
            }
            res.status(200).json({ message: "owner tem conta no nosso sistema", result });
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
exports.getAccountById = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = accounts_1.accounts.find((account) => account.id === id);
        if (!result) {
            res.status(404);
            throw new Error("404: conta NÃO encontrada, verifique o Id");
        }
        res.status(200).json({ message: "conta encontrado no nosso sistema", result });
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
exports.destroyAccount = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idToDelete = req.params.id;
        const result = accounts_1.accounts.findIndex((account) => account.id === idToDelete);
        if (result === -1) {
            res.status(404);
            throw new Error("404: conta NÃO encontrada, verifique o Id");
        }
        if (result >= 0) {
            accounts_1.accounts.splice(result, 1);
        }
        res.status(200).send("account deletado com sucesso");
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
exports.createAccount = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newId = req.body.id;
        const newOwner = req.body.ownerName;
        const newBalance = req.body.balance;
        const newType = req.body.type;
        const id = (0, getIdB_1.createId)(newId);
        const newAccount = {
            id,
            ownerName: newOwner,
            balance: newBalance,
            type: newType
        };
        accounts_1.accounts.push(newAccount);
        res.status(201).json({ message: 'account agregado com sucesso', newAccount });
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
exports.editAccount = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const owner4Edit = req.body.ownerName;
        const balance4Edit = req.body.balance;
        const type4Edit = req.body.type;
        const account4edit = accounts_1.accounts.find((account) => account.id === id);
        if (!account4edit) {
            res.status(404);
            throw new Error('404: account NÃO ENCONTRADA, VERIFICAR ID correto para Atualização');
        }
        account4edit.id = id;
        account4edit.ownerName = owner4Edit || account4edit.ownerName;
        account4edit.balance = balance4Edit || account4edit.balance;
        account4edit.type = type4Edit || account4edit.type;
        res.status(200).json({ message: 'account atualizado com sucesso', account4edit });
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
//# sourceMappingURL=accountsController.js.map