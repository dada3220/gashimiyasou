"use strict";

// =========================
// ヘッダー読み込み
// =========================

fetch("parts/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header-area").innerHTML = data;

    initMenu();
  })
  .catch((error) => {
    console.error("ヘッダーの読み込みに失敗しました。", error);
  });

// =========================
// フッター読み込み
// =========================

fetch("parts/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer-area").innerHTML = data;

    // フッター読み込み後に上に戻るボタンを初期化
    initBackToTop();
  })
  .catch((error) => {
    console.error("フッターの読み込みに失敗しました。", error);
  });

// =========================
// メニュー初期化
// =========================

function initMenu() {
  // -------------------------
  // サブメニュー
  // -------------------------

  document.querySelectorAll(".submenu-toggle").forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();

      const parent = toggle.closest(".has-submenu");

      parent.classList.toggle("active");
    });
  });

  // -------------------------
  // ハンバーガーメニュー
  // -------------------------

  const menu = document.getElementById("menu");
  const hamOpen = document.getElementById("ham_op");
  const hamClose = document.getElementById("ham_cl");

  // 要素が存在しない場合は処理しない
  if (!menu || !hamOpen || !hamClose) {
    return;
  }

  // メニューを開く
  hamOpen.addEventListener("click", () => {
    menu.classList.add("show");

    document.body.style.overflow = "hidden";
  });

  // メニューを閉じる
  hamClose.addEventListener("click", () => {
    menu.classList.remove("show");

    document.body.style.overflow = "";
  });

  // -------------------------
  // 外側をクリックして閉じる
  // -------------------------

  document.addEventListener("click", (e) => {
    if (
      menu.classList.contains("show") &&
      !menu.contains(e.target) &&
      !hamOpen.contains(e.target)
    ) {
      menu.classList.remove("show");

      document.body.style.overflow = "";
    }
  });
}

// =========================================================
// 上に戻るボタン初期化
// =========================================================

function initBackToTop() {
  const backToTop = document.getElementById("backToTop");

  // ボタンが存在しない場合は処理しない
  if (!backToTop) {
    return;
  }

  // -------------------------
  // スクロールで表示・非表示
  // -------------------------

  window.addEventListener("scroll", () => {
    if (window.scrollY > 1500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  // -------------------------
  // クリックでページ上部へ
  // -------------------------

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
