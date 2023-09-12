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
exports.destroyUser = exports.editUserById = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const knexDB_1 = require("../../models/knexDB");
const User_1 = require("../../models/User");
exports.getAllUsers = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.q;
        if (searchTerm === undefined) {
            const message = "LISTA DE USERS CADASTRADO DO SISTEMA";
            const result = yield (0, knexDB_1.db)("users");
            const usersDB = result;
            const users = usersDB.map((userDB) => new User_1.User(userDB.id, userDB.name, userDB.nickname, userDB.password, userDB.email, userDB.created_at, userDB.avatar_img, userDB.role));
            res.status(200).json(users);
        }
        else {
            const result = yield (0, knexDB_1.db)("users").where("name", "LIKE", `%${searchTerm}%`);
            if (!result || result == null) {
                res.status(404).json({ message: "USER NÃO ENCONTRADO" });
            }
            else {
                const usersDB = result;
                const users = usersDB.map((userDB) => new User_1.User(userDB.id, userDB.name, userDB.nickname, userDB.password, userDB.email, userDB.created_at, userDB.avatar_img, userDB.role));
                res.status(200).json({ message: "Resultado para termo buscado", users });
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
    try {
        const searchId = req.params.id;
        const idExists = knexDB_1.db.raw(`SELECT * FROM users WHERE id=${searchId}`);
        if (!idExists || idExists === undefined) {
            res.status(404);
            throw new Error("'404': User não encontrado");
        }
        else {
            const result = [idExists];
            res.status(200).json({ message: "USUARIO ENCONTRADO", result });
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
        const cpfCnpj = req.body.inputCpfCnpj;
        const name = req.body.inputName;
        const nickname = req.body.inputNickname;
        const email = req.body.inputEmail;
        const password = req.body.inputPassword;
        const role = req.body.inputRole;
        const avatar = req.body.inputAvatar;
        const today = Date.now();
        const [userExists] = yield knexDB_1.db.raw(`SELECT id FROM users WHERE id="${cpfCnpj}"`);
        if (userExists) {
            res.status(400);
            throw new Error("id já esta em uso");
        }
        const [emailExists] = yield knexDB_1.db.raw(`SELECT email FROM users WHERE id="${cpfCnpj}"`);
        if (emailExists) {
            res.status(400);
            throw new Error("id já esta em uso");
        }
        const [nicknameExists] = yield knexDB_1.db.raw(`SELECT nickname FROM users WHERE id="${cpfCnpj}"`);
        if (nicknameExists) {
            res.status(400);
            throw new Error("id já esta em uso");
        }
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
            throw new Error("'password ' deve ser uma string");
        }
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
            throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial");
        }
        const newUser = new User_1.User(cpfCnpj, name, nickname, email, password, today.toString(), avatar, role);
        yield knexDB_1.db.raw(`INSERT INTO users (id, name, nickname, email , password, created_at , avatar_img , role)
        VALUES ("${cpfCnpj}", "${name}", "${nickname}", "${email}", "${password}" , "${today}", "${avatar}", "${role}")`);
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
exports.editUserById = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cpfCnpj = req.body.inputCpfCnpj;
        const name = req.body.inputName;
        const nickname = req.body.inputNickname;
        const email = req.body.inputEmail;
        const password = req.body.inputPasswordConfirm;
        const role = req.body.inputRole;
        const avatar = req.body.inputAvatar;
        if (name) {
            if (typeof name !== "string") {
                res.status(400);
                throw new Error("Nome do produto deve ser do tipo string");
            }
        }
        if (nickname) {
            if (typeof nickname !== "string") {
                res.status(400);
                throw new Error("Descrição deve ser do tipo string");
            }
        }
        if (email) {
            if (typeof email !== "string") {
                res.status(400);
                throw new Error("Novo email deve ser de tipo string");
            }
        }
        if (password) {
            if (typeof password == "string") {
                throw new Error("'new password ' deve ser uma string");
            }
        }
        if (password) {
            if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
                throw new Error("'new password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial");
            }
        }
        const [user4edit] = yield knexDB_1.db.raw(`SELECT * FROM users WHERE users.id=${cpfCnpj}`);
        if ([user4edit]) {
            user4edit.id = user4edit.id,
                user4edit.name = name || user4edit.name,
                user4edit.nickname = nickname || user4edit.nickname,
                user4edit.email = email || user4edit.email,
                user4edit.password = password || user4edit.password,
                user4edit.role = role || user4edit.role,
                user4edit.avatar_img = avatar || user4edit.avatar;
        }
        yield (0, knexDB_1.db)("users").update(user4edit).where({ id: `${cpfCnpj}` });
        res.status(201).send({ message: "user atualizado com sucesso", result: user4edit });
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
            throw new Error("usuário  nao encontrado");
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