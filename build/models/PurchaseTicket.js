"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasedTicket = void 0;
class PurchasedTicket {
    constructor(id, buyerId, productId, quantity, finalPrice, totalPaid, totalPayments, valuePayment, startRentalAt, endRentalAt) {
        this.id = id;
        this.buyerId = buyerId;
        this.productId = productId;
        this.quantity = quantity;
        this.finalPrice = finalPrice;
        this.totalPaid = totalPaid;
        this.totalPayments = totalPayments;
        this.valuePayment = valuePayment;
        this.startRentalAt = startRentalAt;
        this.endRentalAt = endRentalAt;
    }
}
exports.PurchasedTicket = PurchasedTicket;
//# sourceMappingURL=PurchaseTicket.js.map