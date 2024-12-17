const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  likedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // ユーザーのIDリスト
});

module.exports = mongoose.model("Message", messageSchema);
