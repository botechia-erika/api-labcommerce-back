"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./../routes/products"));
const purchases_1 = __importDefault(require("./../routes/purchases"));
const courses_1 = __importDefault(require("./../routes/courses"));
const accounts_1 = __importDefault(require("./../routes/accounts"));
const users_1 = __importDefault(require("./../routes/users"));
class Server {
    constructor() {
        this.apiPaths = {
            productsApi: '/products',
            purchasesApi: '/purchases',
            coursesApi: '/courses',
            accountsApi: '/accounts',
            usersApi: '/users'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3003";
        this.routes();
    }
    routes() {
        this.app.use(this.apiPaths.productsApi, products_1.default);
        this.app.use(this.apiPaths.purchasesApi, purchases_1.default);
        this.app.use(this.apiPaths.coursesApi, courses_1.default);
        this.app.use(this.apiPaths.accountsApi, accounts_1.default);
        this.app.use(this.apiPaths.usersApi, users_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('EXPRESS WS ON PORT ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=Server.js.map