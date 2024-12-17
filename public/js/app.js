// メッセージ送信ボタンのイベントリスナー
document.getElementById("send-message").addEventListener("click", () => {
  const userMessage = document.getElementById("user-message").value;
  const messageDisplay = document.getElementById("message-display");

  if (userMessage) {
    // メッセージを保存
    sessionStorage.setItem("userMessage", userMessage);

    // 保存成功メッセージを表示
    messageDisplay.innerHTML =
      "名前を保存しました！<br>次に「Tap Me!」を押してください。";
    messageDisplay.style.color = "green";
    messageDisplay.classList.add("show");
  } else {
    // 名前未入力のエラーメッセージを表示
    messageDisplay.textContent = "名前を入力してください！";
    messageDisplay.style.color = "red";
    messageDisplay.classList.add("show");
  }
});

// クラッカーボタン
const crackerButton = document.getElementById("cracker-btn");

// 紙吹雪アニメーション用のキャンバス
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 紙吹雪ライブラリを使用
function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.5, y: 0.5 },
  });
}

// ボタンクリックイベント
crackerButton.addEventListener("click", () => {
  // ボタンを無効化（再クリック防止）
  crackerButton.disabled = true;

  // 1. ボタンに震えるクラスを追加
  crackerButton.classList.add("shake");

  // 2. 震えが終わったらクラッカーを実行
  setTimeout(() => {
    crackerButton.classList.remove("shake"); // 震え終了

    // クラッカーアニメーションを遅延実行
    triggerConfetti();

    // 3. メッセージを表示
    const messageDisplay = document.getElementById("message-display");
    const savedMessage = sessionStorage.getItem("userMessage");

    if (savedMessage) {
      messageDisplay.textContent = `✨${savedMessage}さん、メリークリスマス✨`; // メッセージを表示
      messageDisplay.classList.add("show"); // メッセージを表示するクラス追加
    }

    // アニメーション終了後にボタンを再有効化
    setTimeout(() => {
      crackerButton.disabled = false;
    }, 500); // 震え + クラッカーアニメーションが終わるまでの待機時間
  }, 500); // 震えアニメーションが0.5秒なのでその後に実行
});

document.getElementById("like-button").addEventListener("click", function () {
  const messageId = "unique-message-id"; // 一意のメッセージID（後で動的に変更できる）

  // サーバーにいいねリクエストを送る
  fetch("/like", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messageId }),
  })
    .then((response) => response.json())
    .then((data) => {
      // 画面にいいね数を表示
      document.getElementById("like-count").textContent = data.likes;
    })
    .catch((error) => console.error("Error:", error));
});
