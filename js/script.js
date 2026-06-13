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
// メニュー初期化
// =========================

function initMenu() {
  // サブメニュー
  document.querySelectorAll(".submenu-toggle").forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();

      const parent = toggle.closest(".has-submenu");
      parent.classList.toggle("active");
    });
  });

  // ハンバーガーメニュー
  const menu = document.getElementById("menu");
  const hamOpen = document.getElementById("ham_op");
  const hamClose = document.getElementById("ham_cl");

  hamOpen.addEventListener("click", () => {
    menu.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  hamClose.addEventListener("click", () => {
    menu.classList.remove("show");
    document.body.style.overflow = "";
  });

  // 外クリックで閉じる
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

// =========================
// FlexSlider
// =========================

$(document).ready(function () {
  $(".flexslider").flexslider({
    animation: "fade",

    slideshowSpeed: 6000,

    animationSpeed: 2500,

    controlNav: true,

    directionNav: false,

    pauseOnHover: false,
  });
});

// =========================
// Lightbox
// =========================

if (typeof lightbox !== "undefined") {
  lightbox.option({
    alwaysShowNavOnTouchDevices: true,

    showImageNumberLabel: false,

    maxWidth: 1000,
  });
}
