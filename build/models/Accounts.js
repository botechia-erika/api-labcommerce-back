"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
class Account {
    constructor(id, balance, ownerId, createdAt) {
        this.id = id;
        this.balance = balance;
        this.ownerId = ownerId;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getBalance() {
        return this.balance;
    }
    setBalance(value) {
        this.balance = value;
    }
    getOwnerId() {
        return this.ownerId;
    }
    setOwnerId(value) {
        this.ownerId = value;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(value) {
        this.createdAt = value;
    }
}
exports.Account = Account;
//# sourceMappingURL=Accounts.js.map