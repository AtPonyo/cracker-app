const express = require("express");
const router = express.Router();
const Like = require("../models/like"); // モデルをインポート
const authMiddleware = require("../middleware/auth"); // 認証用ミドルウェア

// いいね/いいね取り消しAPI
router.post("/like/:messageId", authMiddleware, async (req, res) => {
  console.log("User ID:", req.userId); // ユーザーIDを確認
  const { messageId } = req.params;
  const userId = req.userId; // 認証されたユーザーID

  try {
    const like = await Like.findOne({ messageId });

    if (!like) {
      return res.status(404).json({ error: "Message not found" });
    }

    // ユーザーが既に「いいね」しているかチェック
    const userIndex = like.likedUsers.indexOf(userId);

    if (userIndex === -1) {
      // 新しく「いいね」を追加
      like.likes += 1;
      like.likedUsers.push(userId);
    } else {
      // 既存の「いいね」を取り消し
      like.likes -= 1;
      like.likedUsers.splice(userIndex, 1); // 配列からユーザーIDを削除
    }

    await like.save();

    res.status(200).json({
      message: userIndex === -1 ? "Like added" : "Like removed",
      likes: like.likes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
