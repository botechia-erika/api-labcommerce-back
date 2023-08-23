"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscaPostsPorAutor = void 0;
function buscaPostsPorAutor(posts, autorInformado) {
    return posts.filter((post) => {
        return post.autor === autorInformado;
    });
}
exports.buscaPostsPorAutor = buscaPostsPorAutor;
//# sourceMappingURL=buscaPostPorAutor.js.map