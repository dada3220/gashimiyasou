"use strict";

// =========================
// 客室画像
// =========================

const roomImages = [
  [
    "images/room/room01.png",
    "images/room/standard_room01.png",
    "images/room/standard_room02.png",
  ],

  [
    "images/room/room02.png",
    "images/room/deluxe_room01.png",
    "images/room/deluxe_room02.png",
    "images/room/deluxe_room03.png",
  ],

  [
    "images/room/room03.png",
    "images/room/suite_room01.png",
    "images/room/suite_room02.png",
    "images/room/suite_room03.png",
    "images/room/suite_room04.png",
  ],
];

// =========================
// スライダー初期化
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(".room_slider");

  sliders.forEach((slider, roomIndex) => {
    const image = slider.querySelector(".slider_image");

    const prevBtn = slider.querySelector(".prev");

    const nextBtn = slider.querySelector(".next");

    let currentIndex = 0;

    // 前へ
    prevBtn.addEventListener("click", () => {
      currentIndex--;

      if (currentIndex < 0) {
        currentIndex = roomImages[roomIndex].length - 1;
      }

      image.src = roomImages[roomIndex][currentIndex];
    });

    // 次へ
    nextBtn.addEventListener("click", () => {
      currentIndex++;

      if (currentIndex >= roomImages[roomIndex].length) {
        currentIndex = 0;
      }

      image.src = roomImages[roomIndex][currentIndex];
    });
  });
});

// =========================
// アンカーリンクを
// 少しなめらかにする
// =========================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});
