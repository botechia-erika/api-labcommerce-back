"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.ROLES = void 0;
var ROLES;
(function (ROLES) {
    ROLES["NORMAL"] = "Normal";
    ROLES["STUDENT"] = "Student";
    ROLES["OWNER"] = "Owner";
    ROLES["EMPLOYER"] = "Employer";
    ROLES["AUTHOR"] = "Author";
    ROLES["INSTRUCTOR"] = "Instructor";
    ROLES["BUYER"] = "Buyer";
    ROLES["BANDS"] = "Bands'";
    ROLES["ENTERPRISE"] = "Enterprise";
    ROLES["VENDORS"] = "Vendors";
})(ROLES || (exports.ROLES = ROLES = {}));
class User {
    constructor(id, name, nickname, password, email, createdAt, avatar, role) {
        this.id = id;
        this.name = name;
        this.nickname = nickname;
        this.password = password;
        this.email = email;
        this.createdAt = createdAt;
        this.avatar = avatar;
        this.role = role;
    }
    getId() {
        return this.id;
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
}
exports.User = User;
//# sourceMappingURL=User.js.map