"use strict";

/* =========================================================
   がしみや荘 館内マップ
   building.js

   ・本館 / 庭園タブ切り替え
   ・本館フロアナビ
   ・庭園SVGクリックマップ
   ・本館SVGクリックマップ
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     本館 / 庭園 タブ切り替え
  ========================================================= */

  const mapTabs = document.querySelectorAll(".map_tab");
  const mapContents = document.querySelectorAll(".map_tab_content");

  mapTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.tab;

      if (!targetId) return;

      const targetContent = document.getElementById(targetId);

      if (!targetContent) {
        console.warn(`タブの切り替え先が見つかりません: #${targetId}`);
        return;
      }

      /* -------------------------------------------------------
         すべてのタブを閉じる
      ------------------------------------------------------- */

      mapTabs.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
      });

      /* -------------------------------------------------------
         すべてのコンテンツを閉じる
      ------------------------------------------------------- */

      mapContents.forEach((content) => {
        content.classList.remove("active");
        content.hidden = true;
      });

      /* -------------------------------------------------------
         クリックしたタブを開く
      ------------------------------------------------------- */

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      targetContent.classList.add("active");
      targetContent.hidden = false;

      /* -------------------------------------------------------
         タブ切り替え後、ページ上部へ少し戻す
      ------------------------------------------------------- */

      const mapTabsPosition =
        document.querySelector(".map_tabs")?.getBoundingClientRect().top +
        window.scrollY -
        120;

      if (mapTabsPosition !== undefined) {
        window.scrollTo({
          top: Math.max(0, mapTabsPosition),
          behavior: "smooth",
        });
      }
    });
  });

  /* =========================================================
     本館 フロアナビゲーション
  ========================================================= */

  const floorLinks = document.querySelectorAll(".floor_nav a");

  floorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);

      if (!target) {
        console.warn(`フロアのリンク先が見つかりません: ${href}`);
        return;
      }

      event.preventDefault();

      /* -------------------------------------------------------
         フロア位置までスクロール
      ------------------------------------------------------- */

      const offset = 120;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* =========================================================
     本館 SVG マップ
  ========================================================= */

  const buildingMapObject = document.querySelector(".building_map_svg");

  if (buildingMapObject) {
    buildingMapObject.addEventListener("load", () => {
      const svgDocument = buildingMapObject.contentDocument;

      if (!svgDocument) {
        console.warn("本館マップSVGのcontentDocumentを取得できませんでした。");
        return;
      }

      console.log("本館マップSVGの読み込み成功");

      const links = svgDocument.querySelectorAll("a");

      console.log(`本館マップのクリックエリア：${links.length}個`);

      links.forEach((link) => {
        setupSvgLink(link, "building");
      });
    });

    buildingMapObject.addEventListener("error", () => {
      console.error(
        "本館マップSVGの読み込みに失敗しました。",
        buildingMapObject.data,
      );
    });
  }

  /* =========================================================
     庭園 SVG マップ
  ========================================================= */

  const gardenMapObject = document.querySelector(".garden_map_svg");

  if (gardenMapObject) {
    gardenMapObject.addEventListener("load", () => {
      const svgDocument = gardenMapObject.contentDocument;

      if (!svgDocument) {
        console.warn("庭園マップSVGのcontentDocumentを取得できませんでした。");
        return;
      }

      console.log("庭園マップSVGの読み込み成功");

      const links = svgDocument.querySelectorAll("a");

      console.log(`庭園マップのクリックエリア：${links.length}個`);

      links.forEach((link) => {
        setupSvgLink(link, "garden");
      });
    });

    gardenMapObject.addEventListener("error", () => {
      console.error(
        "庭園マップSVGの読み込みに失敗しました。",
        gardenMapObject.data,
      );
    });
  }

  /* =========================================================
     SVG クリックエリア共通処理
  ========================================================= */

  function setupSvgLink(link, type) {
    link.style.cursor = "pointer";

    /* -------------------------------------------------------
       SVG内部の図形
    ------------------------------------------------------- */

    const shape = link.querySelector("rect, path, polygon, circle, ellipse");

    if (!shape) {
      console.warn(`${type}マップ：クリック対象の図形が見つかりません。`);
    }

    /* -------------------------------------------------------
       マウスオーバー
    ------------------------------------------------------- */

    link.addEventListener("mouseenter", () => {
      if (!shape) return;

      shape.style.fill = "#ffffff";
      shape.style.fillOpacity = "0.18";
    });

    /* -------------------------------------------------------
       マウスアウト
    ------------------------------------------------------- */

    link.addEventListener("mouseleave", () => {
      if (!shape) return;

      shape.style.fill = "#000000";
      shape.style.fillOpacity = "0";
    });

    /* -------------------------------------------------------
       クリック
    ------------------------------------------------------- */

    link.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const href = link.getAttribute("href");

      console.log(`${type}マップクリック:`, href);

      if (!href) return;

      /* -----------------------------------------------------
         ページ内リンク以外は通常処理しない
      ----------------------------------------------------- */

      if (!href.startsWith("#")) {
        return;
      }

      const target = document.querySelector(href);

      if (!target) {
        console.warn(`${type}マップのリンク先が見つかりません: ${href}`);
        return;
      }

      /* -----------------------------------------------------
         庭園側の施設へスクロール
      ----------------------------------------------------- */

      const offset = type === "garden" ? 150 : 120;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  }

  /* =========================================================
     初期状態確認
  ========================================================= */

  const initialTab = document.querySelector(".map_tab.active");

  const initialContent = document.querySelector(".map_tab_content.active");

  if (initialTab && initialContent) {
    initialTab.setAttribute("aria-selected", "true");
    initialContent.hidden = false;
  }

  console.log("がしみや荘 館内マップ initialized");
});
