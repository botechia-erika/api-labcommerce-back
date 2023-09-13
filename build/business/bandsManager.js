"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBandPassword = exports.createBandNickname = exports.createBandEmail = void 0;
const createBandEmail = (email, withoutSpace) => {
    const emailGerado = "bands@" + withoutSpace + ".play.add";
    return emailGerado;
};
exports.createBandEmail = createBandEmail;
const createBandNickname = (countryCode, withoutSpace) => {
    const nicknameGerado = (countryCode + "@" + withoutSpace);
    return nicknameGerado;
};
exports.createBandNickname = createBandNickname;
const createBandPassword = (passwordConfirm, withoutSpace) => {
    if (!passwordConfirm && passwordConfirm != undefined) {
        throw new Error("'password' de acceso deve ser gerado automaticamente");
    }
    else {
        const createPasswordBand = ("play@" + withoutSpace);
        return createPasswordBand;
    }
};
exports.createBandPassword = createBandPassword;
//# sourceMappingURL=bandsManager.js.map