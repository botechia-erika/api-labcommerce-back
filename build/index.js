"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const purchases_1 = __importDefault(require("./routes/purchases"));
const products_1 = __importDefault(require("./routes/products"));
const courses_1 = __importDefault(require("./routes/courses"));
const accounts_1 = __importDefault(require("./routes/accounts"));
const users_1 = __importDefault(require("./routes/users"));
dotenv_1.default.config();
const port = process.env.PORT || "3003";
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
app.use('/purchases', purchases_1.default);
app.get("/", (req, res) => {
    res.send(`<h1>Bem - vindo ao Labecommerce !</h1>`);
});
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
//# sourceMappingURL=index.js.map