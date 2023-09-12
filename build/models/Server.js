"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./../routes/products"));
class Server {
    constructor() {
        this.apiPaths = {
            productsApi: '/products'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3003";
    }
    routes() {
        this.app.use(this.apiPaths.productsApi, products_1.default);
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('EXPRESS WS ON PORT ' + this.port);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map