"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    text: String,
    username: String,
    date: String,
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    comments: [
        {
            text: String,
            username: String,
            date: String,
        },
    ],
    likes: [
        {
            username: String,
            date: String,
        },
    ],
});
exports.default = mongoose_1.model("Post", PostSchema);
//# sourceMappingURL=post.model.js.map