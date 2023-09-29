"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(id, name, description, imageUrl, price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        return this.description;
    }
    setDescription(value) {
        this.description = value;
    }
    getImageUrl() {
        return this.imageUrl;
    }
    setImageUrl(value) {
        this.imageUrl = value;
    }
    getPrice() {
        return this.price;
    }
    setPrice(value) {
        this.price = value;
    }
}
exports.Product = Product;
//# sourceMappingURL=Product.js.map