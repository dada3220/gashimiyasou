"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const floorItems = document.querySelectorAll(".floor_item");

  floorItems.forEach((item) => {
    const button = item.querySelector(".floor_btn");

    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // すべて閉じる
      floorItems.forEach((floor) => {
        floor.classList.remove("active");
      });

      // クリックしたものが閉じていた場合のみ開く
      if (!isActive) {
        item.classList.add("active");

        // 開いた階までスクロール
        if (!isActive) {
          item.classList.add("active");

          setTimeout(() => {
            const offset = 145;

            const targetPosition =
              item.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }, 100);
        }
      }
    });
  });
});
