"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Phone = void 0;
class Phone {
    constructor(id, userId, phoneNumber) {
        this.id = id;
        this.userId = userId;
        this.phoneNumber = phoneNumber;
    }
    getId() {
        return this.id;
    }
    setId(value) {
        this.id = value;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(value) {
        this.userId = value;
    }
    getPhoneNumber() {
        return this.phoneNumber;
    }
    setPhoneNumber(value) {
        this.phoneNumber = value;
    }
}
exports.Phone = Phone;
//# sourceMappingURL=Phone.js.map