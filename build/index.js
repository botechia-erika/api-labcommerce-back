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
const port = process.env.PORT || 3003;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const knexDB_1 = require("./models/knexDB");
const types_1 = require("./types/types");
const products_1 = __importDefault(require("./routes/products"));
const courses_1 = __importDefault(require("./routes/courses"));
const accounts_1 = __importDefault(require("./routes/accounts"));
const users_1 = __importDefault(require("./routes/users"));
console.log(types_1.arrayPersonRole);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get("/ping", (req, res) => {
    res.send("Pong");
});
app.use('/products', products_1.default);
app.use('/courses', courses_1.default);
app.use('/accounts', accounts_1.default);
app.use('/users', users_1.default);
app.get("/", (req, res) => {
    res.send(`
        <h1>Bem - vindo ao Labecommerce!</h1>
        `);
});
app.get("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield knexDB_1.db.raw(`select * from purchases`);
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
        const result = yield knexDB_1.db.raw(`
        FROM PURCHASES
        INNER JOIN PRODUCTS_PURCHASES
        ON PURCHASES.ID = PRODUCTS_PURCHASES.PURCHASE_ID
        INNER JOIN PRODUCTS
        ON PRODUCTS_PURCHASES.PRODUCT_ID = PRODUCTS.ID
        WHERE
        PURCHASE_ID=${id}`);
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
        yield (0, knexDB_1.db)("purchases").insert(newPurchase);
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
        const [purchaseDelete] = yield (0, knexDB_1.db)("purchases").where({ id: id });
        if (!purchaseDelete) {
            throw new Error("purchase  nao encontrado");
        }
        yield (0, knexDB_1.db)("purchases").delete().where({ id: `${id}` });
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
app.listen(port, () => {
    console.log(`Servidor rodando na porta 3003 `);
});
//# sourceMappingURL=index.js.map