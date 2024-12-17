const express = require("express");
const mongoose = require("mongoose");
const Like = require("./models/like"); // Mongooseモデルをインポート
const likeRoutes = require("./routes/like"); // 追加
require("dotenv").config(); // 環境変数を利用するため

const app = express();
const port = process.env.PORT || 4000;

// 静的ファイルを提供（HTML, CSS, JSなど）
app.use(express.static("public"));
app.use(express.json()); // JSONを扱うため

// ルート登録
app.use("/api", likeRoutes); // "/api/like/:messageId" でアクセス可能

// サーバー起動
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// いいねを増やすエンドポイント
app.post("/like", async (req, res) => {
  const { messageId } = req.body;

  // メッセージIDに基づいて、既存の「いいね」データを検索
  let like = await Like.findOne({ messageId });

  if (!like) {
    // 存在しない場合は新規作成
    like = new Like({ messageId, likes: 1 });
  } else {
    // 存在する場合は「いいね」数を1増やす
    like.likes += 1;
  }

  // 変更を保存
  await like.save();

  // 最新のいいね数をレスポンスとして返す
  res.status(200).json({ likes: like.likes });
});

// .envから環境変数を取得
const mongoUri = process.env.MONGO_URI;

// MongoDBに接続
mongoose
  .connect(process.env.MONGO_URI) // オプションなしでOK
  .then(() => console.log("MongoDBに接続しました"))
  .catch((err) => console.error("MongoDB接続エラー:", err));
