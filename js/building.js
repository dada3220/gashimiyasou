"use strict";

/* =========================================================
   がしみや荘 館内マップ
   building.js

   ・本館 / 庭園タブ切り替え
   ・本館フロアナビ
   ・本館SVGクリックマップ
   ・庭園SVGクリックマップ
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     共通：スムーススクロール
  ========================================================= */

  const smoothScrollTo = (selector) => {
    if (!selector || !selector.startsWith("#")) {
      return;
    }

    const target = document.querySelector(selector);

    if (!target) {
      console.warn(`リンク先が見つかりません: ${selector}`);
      return;
    }

    const offset = 120;

    const position =
      target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  /* =========================================================
     本館 / 庭園 タブ
  ========================================================= */

  const tabs = document.querySelectorAll(".map_tab");
  const tabContents = document.querySelectorAll(".map_tab_content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.tab;

      if (!targetId) {
        return;
      }

      /* -------------------------
         タブの状態
      ------------------------- */

      tabs.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      /* -------------------------
         コンテンツの状態
      ------------------------- */

      tabContents.forEach((content) => {
        const isTarget = content.id === targetId;

        content.classList.toggle("active", isTarget);

        if (isTarget) {
          content.removeAttribute("hidden");
        } else {
          content.setAttribute("hidden", "");
        }
      });

      /* -------------------------
         タブ切り替え後に先頭へ
      ------------------------- */

      const target = document.getElementById(targetId);

      if (target) {
        setTimeout(() => {
          const offset = 120;

          const position =
            target.getBoundingClientRect().top + window.scrollY - offset;

          window.scrollTo({
            top: position,
            behavior: "smooth",
          });
        }, 50);
      }
    });
  });

  /* =========================================================
     フロアナビ
  ========================================================= */

  const floorLinks = document.querySelectorAll(".floor_nav a");

  floorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || !href.startsWith("#")) {
        return;
      }

      const target = document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();

      smoothScrollTo(href);
    });
  });

  /* =========================================================
     SVGクリックマップ
  ========================================================= */

  const setupSvgMap = (selector, mapName) => {
    const mapObject = document.querySelector(selector);

    if (!mapObject) {
      return;
    }

    mapObject.addEventListener("load", () => {
      const svgDocument = mapObject.contentDocument;

      if (!svgDocument) {
        console.warn(`${mapName}SVGのcontentDocumentを取得できませんでした。`);

        return;
      }

      console.log(`${mapName}マップSVGの読み込み成功`);

      /* -------------------------
         SVG内の<a>を取得
      ------------------------- */

      const links = svgDocument.querySelectorAll("a");

      console.log(`${mapName}マップのクリックエリア：${links.length}個`);

      if (links.length === 0) {
        console.warn(`${mapName}SVG内に<a>タグがありません。`);

        return;
      }

      /* =====================================================
         各クリックエリア
      ===================================================== */

      links.forEach((link) => {
        /* -------------------------
           カーソル
        ------------------------- */

        link.style.cursor = "pointer";

        /* -------------------------
           クリックエリア内の図形
        ------------------------- */

        const shape = link.querySelector(
          "rect, path, polygon, polyline, circle, ellipse",
        );

        /* =====================================================
           マウスオーバー
        ===================================================== */

        link.addEventListener("mouseenter", () => {
          if (!shape) {
            return;
          }

          shape.style.setProperty("fill", "#ffffff");
          shape.style.setProperty("fill-opacity", "0.18");
        });

        /* =====================================================
           マウスアウト
        ===================================================== */

        link.addEventListener("mouseleave", () => {
          if (!shape) {
            return;
          }

          shape.style.setProperty("fill", "#000000");
          shape.style.setProperty("fill-opacity", "0");
        });

        /* =====================================================
           クリック
        ===================================================== */

        link.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();

          /* -------------------------
             href取得
          ------------------------- */

          const href =
            link.getAttribute("href") || link.getAttribute("xlink:href");

          console.log(`${mapName}マップクリック: ${href}`);

          /* -------------------------
             ページ内リンクのみ
          ------------------------- */

          if (!href || !href.startsWith("#")) {
            console.warn(`${mapName}SVGのリンク先が正しくありません:`, href);

            return;
          }

          /* -------------------------
             スクロール
          ------------------------- */

          smoothScrollTo(href);
        });
      });
    });

    /* =========================================================
       SVG読み込みエラー
    ========================================================= */

    mapObject.addEventListener("error", () => {
      console.error(
        `${mapName}マップSVGの読み込みに失敗しました。`,
        mapObject.data,
      );
    });
  };

  /* =========================================================
     本館SVG
  ========================================================= */

  setupSvgMap(".building_map_svg", "本館");

  /* =========================================================
     庭園SVG
  ========================================================= */

  setupSvgMap(".garden_map_svg", "庭園");
});
