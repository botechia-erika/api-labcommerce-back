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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const knex_1 = require("./models/knex");
const types_1 = require("./types/types");
const courses_1 = require("./dataTS/courses");
const uuid_1 = require("uuid");
console.log(types_1.arrayPersonRole);
const app = (0, express_1.default)();
const PORT = 3036;
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.resolve(__dirname, "..", "/public/")));
app.get("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        if (q === undefined) {
            res.status(200).json(courses_1.courses);
        }
        else {
            function buscaCursoPorNome(courses, q) {
                return courses.filter((course) => {
                    if (course.name.toUpperCase().includes(q.toUpperCase())) {
                        return course;
                    }
                });
            }
            const [result] = buscaCursoPorNome(courses_1.courses, q);
            if (result) {
                res.status(200).json({ message: "curso encontrado no nosso sistema", result });
            }
            else {
                res.status(200).json({ result: null, message: "curso NÃO encontrado" });
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
app.post("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newId = req.body.id;
        const newName = req.body.name;
        const newLessons = req.body.lessons || undefined;
        const newStack = req.body.stack || types_1.COURSE_STACK.BACK;
        const getIdb = () => {
            if (newId == undefined) {
                const idB = (0, uuid_1.v4)();
                return idB;
            }
            else {
                const idB = newId;
                return idB;
            }
        };
        const newCourse = {
            id: getIdb(),
            name: newName,
            lessons: newLessons,
            stack: newStack
        };
        courses_1.courses.push(newCourse);
        res.status(201).json({ message: 'curso agregado com sucesso', newCourse });
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
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = req.query.q;
        if (q === undefined) {
            const result = yield (0, knex_1.db)("users");
            res.status(200).send({ result });
        }
        else {
            const [result] = yield (0, knex_1.db)("users").where("name", "LIKE", `%${q}%`);
            if (result) {
                res.status(200).send({ message: "usuario encontrado no nosso sistema", result });
            }
            else {
                res.status(200).send({ message: "usuario NÃO encontrado" });
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
app.get("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (id === "" || id === undefined) {
            res.send({ message: "ID DE USUARIO DEVE SER INFORMADO PARA BUSCA" });
        }
        else {
            const [result] = yield knex_1.db.raw(`SELECT * FROM users WHERE id="${id}"`);
            if (result && result != undefined) {
                res.status(200).send({ message: "USUARIO ENCONTRADO", result: result });
            }
            else {
                res.status(404).send({ message: "USER não encontrado" });
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
app.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const nickname = req.body.nickname;
        const email = req.body.email;
        const password = req.body.password;
        if (typeof id !== typeof "string") {
            res.status(400).send({ message: 'id deve ser cpf - cnpj validado' });
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
            res.status(400).send("outra senha essa é invalida tente alfa-numerico");
        }
        const newAuthor = {
            id,
            name,
            nickname,
            email,
            password
        };
        yield (0, knex_1.db)("users").insert(newAuthor);
        res.status(201).send({ message: "usuario cadastrado com sucesso" });
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
app.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idToDelete = req.params.id;
        const [users] = yield (0, knex_1.db)("users").where({ id: idToDelete });
        if (!users) {
            throw new Error("usuario  nao encontrado");
        }
        yield (0, knex_1.db)("users").delete().where({ id: idToDelete });
        res.status(200).send({ message: 'users deletado com sucesso' });
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
app.put("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const [product4edit] = yield knex_1.db.raw(`SELECT * FROM products WHERE products.id="${newid}"`);
        if ([product4edit]) {
            product4edit.id = newid,
                product4edit.name = newName || product4edit.name,
                product4edit.description = newDescription || product4edit.description,
                product4edit.image_url = newImageUrl || product4edit.image_url,
                product4edit.price = newPrice || product4edit.price;
        }
        yield (0, knex_1.db)("products").update(product4edit).where({ id: `${newid}` });
        res.status(201).send("produto atualizado com sucesso");
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
app.post("/products/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
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
        const newAccount = {
            id,
            name,
            description,
            image_url,
            price
        };
        yield (0, knex_1.db)("products").insert(newAccount);
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
app.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.q;
        if (searchTerm === undefined) {
            const message = "LISTA DE PRODUTOS CADASTRADO DO SISTEMA";
            const result = yield (0, knex_1.db)("products");
            res.status(200).json(result);
        }
        else {
            const [result] = yield (0, knex_1.db)("products").where("name", "LIKE", `%${searchTerm}%`);
            if (![result] || result == null) {
                res.send({ message: "PRODUTO NÃO ENCONTRADO" });
            }
            else {
                res.status(200).json({ result, message: "PRODUTO ENCONTRADO" });
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
app.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newId = req.body.id;
        const newName = req.body.name;
        const newLessons = req.body.lessons;
        const newStack = req.body.stack;
        const newCourse = { id: newId, name: newName, lessons: newLessons, stack: newStack };
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
app.get("/product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const [result] = yield knex_1.db.raw(`SELECT * FROM products WHERE id="${id}"`);
        if (!result) {
            res.status(200).json(`PRODUTO ${id} NÃO CADASTRADO`);
        }
        else {
            res.status(200).json(result);
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
app.get("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knex_1.db.raw(`select * from purchases`);
        res.status(200).send({ message: "lista de pagamentos", result });
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
app.get("/purchase/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield knex_1.db.raw(`
      FROM
    PURCHASES
    INNER JOIN PRODUCTS_PURCHASES
    ON PURCHASES.ID = PRODUCTS_PURCHASES.PURCHASE_ID
    INNER JOIN PRODUCTS
    ON PRODUCTS_PURCHASES.PRODUCT_ID = PRODUCTS.ID
WHERE
    PURCHASE_ID="PG001"`);
        res.status(200).json({ result, message: `RESULTADO PARA PAGAMENTO IDENTIFICADO ${id}` });
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
app.post("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.body.product_id;
        const total_price = req.body.total_price;
        const quantity = req.body.quantity;
        const buyer_id = req.body.buyer_id;
        if (typeof total_price !== "number") {
            throw new Error("preço total deve ser valor numerico valido");
        }
        if (typeof buyer_id !== "string") {
            throw new Error("quantidade de items deve ser valor numerico valida");
        }
        if (typeof quantity !== "number") {
            throw new Error("quantidade de items deve ser valor numerico valida");
        }
        const newId = `${Date.now()}`.toString();
        const newPurchase = {
            id: newId,
            product_id,
            total_price,
            quantity,
            buyer_id
        };
        yield (0, knex_1.db)("purchases").insert(newPurchase);
        res.send(200).json({ message: "cadastro realizado com sucesso", newPurchase });
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
app.delete("/purchases/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [purchaseDelete] = yield (0, knex_1.db)("purchases").where({ id: id });
        if (!purchaseDelete) {
            throw new Error("purchase  nao encontrado");
        }
        yield (0, knex_1.db)("purchases").delete().where({ id: `${id}` });
        res.status(200).json({ message: 'purchase deletado com sucesso' });
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
app.listen(3003, () => {
    console.log(`Servidor rodando na porta 3003 `);
});
//# sourceMappingURL=index.js.map