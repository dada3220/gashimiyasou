"use strict";

/* =========================================================
庭園ページ
garden.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
  スクロールアニメーション
  ======================================================= */

  const fadeTargets = document.querySelectorAll(".fadeUp, .garden_section");

  if (fadeTargets.length > 0) {
    fadeTargets.forEach((element) => {
      element.classList.add("is-hidden");
    });

    const fadeObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.remove("is-hidden");
          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    fadeTargets.forEach((element) => {
      fadeObserver.observe(element);
    });
  }

  /* =======================================================
  庭園マップ
  ======================================================= */

  const gardenMapSvg = document.querySelector(".garden_map_svg");

  if (!gardenMapSvg) {
    return;
  }

  /* =======================================================
  SVG読み込み完了
  ======================================================= */

  gardenMapSvg.addEventListener("load", () => {
    const svgDocument = gardenMapSvg.contentDocument;

    if (!svgDocument) {
      console.warn("庭園マップSVGを読み込めませんでした。");

      return;
    }

    /* =====================================================
    SVG内のリンクを取得
    ===================================================== */

    const links = svgDocument.querySelectorAll("a");

    links.forEach((link) => {
      link.style.cursor = "pointer";

      /* -------------------------
      マウスオーバー
      ------------------------- */

      link.addEventListener("mouseenter", () => {
        link.style.opacity = "0.7";
      });

      /* -------------------------
      マウスアウト
      ------------------------- */

      link.addEventListener("mouseleave", () => {
        link.style.opacity = "1";
      });

      /* -------------------------
      クリック
      ------------------------- */

      link.addEventListener("click", (event) => {
        event.preventDefault();

        const href = link.getAttribute("href");

        if (!href) {
          return;
        }

        /*
         * #gallery
         * #yubatake
         * などのページ内リンクだけ処理
         */

        if (!href.startsWith("#")) {
          return;
        }

        const target = document.querySelector(href);

        if (!target) {
          console.warn(`スクロール先が見つかりません: ${href}`);

          return;
        }

        /* -------------------------
        スムーズスクロール
        ------------------------- */

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        /* -------------------------
        URLの#を変更
        ------------------------- */

        history.pushState(null, "", href);
      });
    });
  });
});
