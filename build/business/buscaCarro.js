"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscaProducto = void 0;
function buscaProducto(products, id_product) {
    if (id_product === undefined) {
        return "produto não informado";
    }
    else {
        return products.filter((product) => {
            return product.id === id_product;
        });
    }
}
exports.buscaProducto = buscaProducto;
//# sourceMappingURL=buscaCarro.js.map