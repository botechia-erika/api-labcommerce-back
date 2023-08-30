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
exports.destroyAccount = exports.editAccount = exports.createAccount = exports.getAccountById = exports.getAllAcounts = void 0;
const accounts_1 = require("../dataTS/accounts");
const createId_1 = require("../helpers/createId");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const accountsFilePath = path_1.default.join(__dirname, './../../json/dataAccounts.json');
const accountsDATA = JSON.parse(fs_1.default.readFileSync(accountsFilePath, 'utf-8'));
exports.getAllAcounts = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        if (q === undefined) {
            res.status(200).json(accountsDATA);
        }
        else {
            function buscaAccountOwner(accountsDATA, q) {
                return accountsDATA.filter((account) => {
                    if (account.ownerName.toUpperCase().includes(q.toUpperCase())) {
                        return account;
                    }
                });
            }
            const [result] = buscaAccountOwner(accountsDATA, q);
            if (!result) {
                res.status(404);
                throw new Error("404 owner NÃO encontrado, insira um nome cadastrado");
            }
            res.status(200).json({ message: "'NOME' do ownwer encontrado no nosso sistema", result });
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
        if (id[0] !== "a") {
            res.status(400);
            throw new Error("'id' deve começar com letra 'a'");
        }
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
exports.createAccount = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newId = req.body.idb || undefined;
        const newOwner = req.body.ownerName;
        const newBalance = req.body.balance;
        const newType = req.body.type;
        const idAccount = accountsDATA.length + 1;
        const defineIdAccount = (idAccount) => {
            if (idAccount < 10) {
                const id = "a00" + idAccount;
                return id;
            }
            else if (idAccount < 100) {
                const id = "a0" + idAccount;
                return id;
            }
            else if (idAccount > 100) {
                const id = "a" + idAccount;
            }
        };
        if (newBalance < 0) {
            res.send(400);
            throw new Error('transação invalida a conta não pode começar em negativo');
        }
        const newAccount = {
            id: defineIdAccount(idAccount) + (0, createId_1.createId)(newId),
            ownerName: newOwner,
            balance: newBalance,
            type: newType
        };
        if (newAccount['id'] !== "a") {
            res.status(400);
            throw new Error("'id' deve começar com letra 'a'");
        }
        accountsDATA.push(newAccount);
        fs_1.default.writeFileSync(accountsFilePath, JSON.stringify(accountsDATA, null, 4), 'utf8');
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
        if (id[0] !== "a") {
            res.status(400);
            throw new Error("'id' deve começar com letra 'a'");
        }
        if (owner4Edit.length < 1) {
            res.status(400);
            throw new Error("nome do 'owner' deve ter ao menos 2 'caracteres'");
        }
        if (balance4Edit < 0) {
            res.status(400);
            throw new Error("'balance' deve ser 0 ou positivo");
        }
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
exports.destroyAccount = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idToDelete = req.params.id;
        if (idToDelete[0] !== "a") {
            res.status(400);
            throw new Error("'id' deve começar com letra 'a'");
        }
        const result = accountsDATA.findIndex((account) => account.id === idToDelete);
        if (result === -1) {
            res.status(404);
            throw new Error("404: conta NÃO encontrada, verifique o Id");
        }
        if (result >= 0) {
            accountsDATA.splice(result, 1);
        }
        res.status(200).send("'account' deletado com sucesso");
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