"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CURRENTSTATUS = exports.ACCOUNT_TYPE = exports.COURSE_STACK = exports.arrayPersonRole = exports.ACCOUNT = exports.ROLE = void 0;
var ROLE;
(function (ROLE) {
    ROLE["ADMIN"] = "Admin";
    ROLE["NORMAL"] = "Normal";
})(ROLE || (exports.ROLE = ROLE = {}));
const usuario = {
    id: 1,
    name: "Matheus",
    nickname: "matheus-user",
    email: "matheus@email.com",
    password: "123456",
    role: ROLE.ADMIN
};
var ACCOUNT;
(function (ACCOUNT) {
    ACCOUNT[ACCOUNT["MENSAL"] = 0] = "MENSAL";
    ACCOUNT[ACCOUNT["ANUAL"] = 1] = "ANUAL";
    ACCOUNT[ACCOUNT["PROMO"] = 2] = "PROMO";
    ACCOUNT[ACCOUNT["COMBO"] = 3] = "COMBO";
})(ACCOUNT || (exports.ACCOUNT = ACCOUNT = {}));
const teste = true;
const userAdmin = {
    nickname: "Muri",
    permission: teste
};
const userNormal = {
    nickname: "Yuri",
    permission: false
};
const usuarioAdmin = {
    id: 100,
    name: "Vitor",
    email: "vitor@gmail.com",
    password: "4321",
    role: ROLE.ADMIN,
    nickname: "Vitão",
    permission: true
};
const usuarioNormal = {
    id: 101,
    name: "Vitor",
    email: "vitor@gmail.com",
    password: "4321",
    role: ROLE.NORMAL,
    nickname: "Vitão",
    permission: false
};
exports.arrayPersonRole = [usuarioAdmin, usuarioNormal];
const arrayPersonRoles = [usuarioAdmin, usuarioNormal];
var RAINBOW_TABLE;
(function (RAINBOW_TABLE) {
    RAINBOW_TABLE["VIOLET"] = "VIOLET";
    RAINBOW_TABLE["INDIGO"] = "INDIGO";
    RAINBOW_TABLE["BLUE"] = "BLUE";
    RAINBOW_TABLE["GREEN"] = "GREEN";
    RAINBOW_TABLE["YELLOW"] = "YELLOW";
    RAINBOW_TABLE["ORANGE"] = "ORANGE";
    RAINBOW_TABLE["RED"] = "RED";
})(RAINBOW_TABLE || (RAINBOW_TABLE = {}));
const pessoa = {
    nome: "Astrodev",
    idade: 30,
    corFavorita: RAINBOW_TABLE.BLUE && RAINBOW_TABLE.INDIGO
};
const homer = {
    nome: "Homer Simpsons",
    idade: 39,
    corFavorita: RAINBOW_TABLE.YELLOW && RAINBOW_TABLE.ORANGE
};
const barney = {
    nome: "Barney",
    idade: 3,
    corFavorita: RAINBOW_TABLE.VIOLET && RAINBOW_TABLE.RED && RAINBOW_TABLE.GREEN
};
var COURSE_STACK;
(function (COURSE_STACK) {
    COURSE_STACK["FRONT"] = "Front-end";
    COURSE_STACK["BACK"] = "Back-end";
})(COURSE_STACK || (exports.COURSE_STACK = COURSE_STACK = {}));
var ACCOUNT_TYPE;
(function (ACCOUNT_TYPE) {
    ACCOUNT_TYPE["BRONZE"] = "Bronze";
    ACCOUNT_TYPE["SILVER"] = "Prata";
    ACCOUNT_TYPE["GOLD"] = "Ouro";
    ACCOUNT_TYPE["PLATINUM"] = "Platina";
    ACCOUNT_TYPE["BLACK"] = "Black";
})(ACCOUNT_TYPE || (exports.ACCOUNT_TYPE = ACCOUNT_TYPE = {}));
var CURRENTSTATUS;
(function (CURRENTSTATUS) {
    CURRENTSTATUS[CURRENTSTATUS["NAOINICIADA"] = 0] = "NAOINICIADA";
    CURRENTSTATUS[CURRENTSTATUS["INICIADA"] = 1] = "INICIADA";
})(CURRENTSTATUS || (exports.CURRENTSTATUS = CURRENTSTATUS = {}));
const Title = {
    name: "CONWAY",
    product: "AULAS",
    value: "LABENU"
};
//# sourceMappingURL=types.js.map