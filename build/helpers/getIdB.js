"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createId = void 0;
const uuid_1 = require("uuid");
function createId(newId) {
    if (newId == undefined) {
        const idB = (0, uuid_1.v4)();
        return idB;
    }
    else {
        const idB = newId;
        return idB;
    }
}
exports.createId = createId;
//# sourceMappingURL=getIdB.js.map