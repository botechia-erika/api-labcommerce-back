"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPurchase = void 0;
exports.createPurchase = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchaseId = req.body.inputId;
        const quantity = req.body.inputQuantity;
        const buyerEmail = req.body.inputBuyerEmail;
        const finalPrice = req.body.inputPrice;
        const paid = 0;
        const createdAt = new Date().toISOString();
        res.send(200).json({ message: "cadastro realizado com sucesso" });
    }
    catch (error) {
        console.log(error);
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Erro inesperado");
        }
    }
}));
//# sourceMappingURL=purchasesController.js.map