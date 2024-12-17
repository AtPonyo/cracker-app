const jwt = require("jsonwebtoken");

// JWT 秘密鍵 (本番環境では環境変数に設定することを推奨)
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

const authMiddleware = (req, res, next) => {
  try {
    // リクエストヘッダーからトークンを取得
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // トークンを検証してデコード
    const decoded = jwt.verify(token, JWT_SECRET);

    // デコードされたユーザーIDをリクエストにセット
    req.userId = decoded.userId;

    // 次のミドルウェアまたはルートハンドラーへ
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
