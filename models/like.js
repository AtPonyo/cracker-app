const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  messageId: { type: String, required: true },
  likes: { type: Number, default: 0 },
  likedUsers: { type: [String], default: [] }, // ユーザーIDを保存する配列
});

module.exports = mongoose.model("Like", LikeSchema);
