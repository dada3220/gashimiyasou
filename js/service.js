/* =========================================================
   がしみや荘 SERVICE PAGE
   service.js
========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* =========================================================
     スクロールフェード
  ========================================================= */

  const fadeItems = document.querySelectorAll(".scroll-fade");

  if (fadeItems.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.05,
      },
    );

    fadeItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* =========================================================
     Lightbox
  ========================================================= */

  if (typeof lightbox !== "undefined") {
    lightbox.option({
      resizeDuration: 300,
      fadeDuration: 300,
      imageFadeDuration: 300,
      wrapAround: true,
      albumLabel: "%1 / %2",
      disableScrolling: true,
    });
  }
});
