"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.ROLES = void 0;
const createId_1 = require("../helpers/createId");
var ROLES;
(function (ROLES) {
    ROLES["NORMAL"] = "Normal";
    ROLES["STUDENT"] = "Student";
    ROLES["OWNER"] = "Owner";
    ROLES["EMPLOYER"] = "Employer";
    ROLES["AUTHOR"] = "Author";
    ROLES["INSTRUCTOR"] = "Instructor";
    ROLES["BUYER"] = "Buyer";
})(ROLES || (exports.ROLES = ROLES = {}));
class User {
    constructor(id, name, nickname, password, email, createdAt, avatar, role) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.avatar = avatar;
        this.role = role;
        this.createdAt = createdAt;
    }
    getId() {
        return this.id;
    }
    setId(newId) {
        const idCreate = (0, createId_1.createId)(newId);
        this.id = idCreate;
    }
    getName() {
        return this.name;
    }
    setName(newName) {
        this.name = newName;
    }
    getNickname() {
        return this.nickname;
    }
    setNickname(newNickname) {
        this.name = newNickname;
    }
    getEmail() {
        return this.email;
    }
    setEmail(newEmail) {
        this.email = newEmail;
    }
    getPassword() {
        return this.password;
    }
    setPassword(newPassword) {
        this.password = newPassword;
    }
    getAvatar() {
        return this.avatar;
    }
    setAvatar(value) {
        this.avatar = value;
    }
    getRole() {
        return this.role;
    }
    setRole(value) {
        this.role = value;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    setCreatedAt(newCreatedAt) {
        this.createdAt = newCreatedAt;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map