"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    email: { type: String, required: true },
});
exports.default = mongoose_1.model("User", UserSchema);
//# sourceMappingURL=user.model.js.map