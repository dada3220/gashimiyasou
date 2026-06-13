"use strict";

// =========================
// ヘッダー読み込み
// =========================

fetch("parts/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header-area").innerHTML = data;

    initMenu();
  });

// =========================
// フッター読み込み
// =========================

fetch("parts/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer-area").innerHTML = data;
  });

// =========================
// スクロールフェード
// =========================

const fadeElements = document.querySelectorAll(
  ".spa_section, .private_section",
);

function fadeAnime() {
  const windowHeight = window.innerHeight;

  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("fadeUp");
    }
  });
}

// スクロール時
window.addEventListener("scroll", fadeAnime);

// 初回実行
window.addEventListener("load", fadeAnime);

// =========================
// Lightbox 設定
// =========================

lightbox.option({
  resizeDuration: 200,
  wrapAround: true,
  fadeDuration: 300,
  imageFadeDuration: 300,
  disableScrolling: true,
  albumLabel: "%1 / %2",
});
