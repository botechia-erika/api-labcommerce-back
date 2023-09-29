"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
class Account {
    constructor(id, balance, owner, category) {
        this.id = id;
        this.balance = balance;
        this.owner = owner;
        this.category = category;
    }
    getId() {
        return this.id;
    }
    getBalance() {
        return this.balance;
    }
    setBalance(value) {
        this.balance = value;
    }
    getOwner() {
        return this.owner;
    }
    setOwnerId(value) {
        this.owner = value;
    }
    getCategory() {
        return this.category;
    }
    setCategory(value) {
        this.category = value;
    }
}
exports.Account = Account;
//# sourceMappingURL=Account.js.map