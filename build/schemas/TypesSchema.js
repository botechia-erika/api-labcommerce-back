"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nullSchema = exports.undefinedSchema = exports.boolSchema = exports.numberSchema = exports.textSchema = void 0;
const zod_1 = require("zod");
exports.textSchema = zod_1.z.string();
exports.numberSchema = zod_1.z.number();
exports.boolSchema = zod_1.z.boolean();
exports.undefinedSchema = zod_1.z.undefined();
exports.nullSchema = zod_1.z.null();
//# sourceMappingURL=TypesSchema.js.map