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
exports.editAccountBalance = exports.createAccount = exports.getAccountBalance = exports.getAllAccounts = void 0;
const Accounts_1 = require("../../models/Accounts");
const knexDB_1 = require("../../database/knexDB");
exports.getAllAccounts = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountsDB = yield (0, knexDB_1.db)("accounts");
        const accounts = accountsDB.map((accountDB) => new Accounts_1.Account(accountDB.id, accountDB.balance, accountDB.owner_id, accountDB.created_at));
        res.status(200).send(accounts);
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
exports.getAccountBalance = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [accountDB] = yield (0, knexDB_1.db)("accounts").where({ id });
        if (!accountDB) {
            res.status(404);
            throw new Error("'id' não encontrado");
        }
        const account = new Accounts_1.Account(accountDB.id, accountDB.balance, accountDB.owner_id, accountDB.created_at);
        const balance = account.getBalance();
        res.status(200).send({ balance });
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
        const { id, ownerId } = req.body;
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("'id' deve ser string");
        }
        if (typeof ownerId !== "string") {
            res.status(400);
            throw new Error("'ownerId' deve ser string");
        }
        const [accountDBExists] = yield (0, knexDB_1.db)("accounts").where({ id });
        if (accountDBExists) {
            res.status(400);
            throw new Error("'id' já existe");
        }
        const newAccount = new Accounts_1.Account(id, 0, ownerId, new Date().toISOString());
        const newAccountDB = {
            id: newAccount.getId(),
            balance: newAccount.getBalance(),
            owner_id: newAccount.getOwnerId(),
            created_at: newAccount.getCreatedAt()
        };
        yield (0, knexDB_1.db)("accounts").insert(newAccountDB);
        res.status(201).send(newAccount);
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
exports.editAccountBalance = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const value = req.body.value;
        if (typeof value !== "number") {
            res.status(400);
            throw new Error("'value' deve ser number");
        }
        const [accountDB] = yield (0, knexDB_1.db)("accounts").where({ id });
        if (!accountDB) {
            res.status(404);
            throw new Error("'id' não encontrado");
        }
        const account = new Accounts_1.Account(accountDB.id, accountDB.balance, accountDB.owner_id, accountDB.created_at);
        const newBalance = account.getBalance() + value;
        account.setBalance(newBalance);
        yield (0, knexDB_1.db)("accounts").update({ balance: newBalance }).where({ id });
        res.status(200).send(account);
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