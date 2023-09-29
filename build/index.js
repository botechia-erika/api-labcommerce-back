"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.APP_ENV = process.env.APP_ENV || "development";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}`,
});
console.log(process.env.APP_FOO);
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const bands_1 = __importDefault(require("./router/apiMusic/bands"));
const frota_1 = __importDefault(require("./router/apiCars/frota"));
const songs_1 = __importDefault(require("./router/apiMusic/songs"));
const accounts_1 = __importDefault(require("./router/apiBank/accounts"));
const users_1 = __importDefault(require("./router/apiUsers/users"));
const phones_1 = __importDefault(require("./router/apiAdmin/phones"));
const app = (0, express_1.default)();
const morgan_1 = __importDefault(require("morgan"));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get("/ping", (req, res) => {
    res.send("Pong");
});
app.use("/phones", phones_1.default);
app.use("/frota", frota_1.default);
app.use("/songs", songs_1.default);
app.use("/accounts", accounts_1.default);
app.use("/users", users_1.default);
app.use("/bands", bands_1.default);
app.get("/", (req, res) => {
    res.send("HomePage");
});
app.listen(3003, () => {
    console.log(`Servidor rodando na porta 3003 `);
});
//# sourceMappingURL=index.js.map