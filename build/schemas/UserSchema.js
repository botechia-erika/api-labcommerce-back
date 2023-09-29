"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    nickname: zod_1.z.string(),
    password: zod_1.z.string(),
    email: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    avatar: zod_1.z.string(),
    role: zod_1.z.string()
});
//# sourceMappingURL=UserSchema.js.map