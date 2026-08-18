"use strict";

/* =========================================================
   がしみや荘 館内マップ
   building.js

   ・本館 / 庭園の大開閉
   ・本館フロアの開閉
   ・庭園SVGクリックマップ
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     本館・庭園 大開閉
  ========================================================= */

  const mapSections = document.querySelectorAll(".map_section");

  mapSections.forEach((section) => {
    const button = section.querySelector(".map_section_btn");

    if (!button) return;

    button.addEventListener("click", () => {
      const isActive = section.classList.contains("active");

      /*
       * クリックしたセクションを開閉
       *
       * 本館と庭園は独立しているため、
       * 他のセクションは閉じない。
       */
      section.classList.toggle("active");

      /*
       * 開いた場合のみ、その位置までスクロール
       */
      if (!isActive) {
        setTimeout(() => {
          const offset = 145;

          const targetPosition =
            section.getBoundingClientRect().top + window.pageYOffset - offset;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }, 100);
      }
    });
  });

  /* =========================================================
     本館 フロアアコーディオン
  ========================================================= */

  const floorItems = document.querySelectorAll(".floor_item");

  floorItems.forEach((item) => {
    const button = item.querySelector(".floor_btn");

    if (!button) return;

    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      /*
       * 同じ本館内のフロアだけを取得
       *
       * 庭園側には .floor_item がないため、
       * 庭園には影響しない。
       */
      const parentSection = item.closest(".map_section");

      if (!parentSection) return;

      const floors = parentSection.querySelectorAll(".floor_item");

      /*
       * すべて閉じる
       */
      floors.forEach((floor) => {
        floor.classList.remove("active");
      });

      /*
       * クリックしたフロアが閉じていた場合だけ開く
       */
      if (!isActive) {
        item.classList.add("active");

        /*
         * 開いたフロアまでスクロール
         */
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
    });
  });

  /* =========================================================
     庭園 SVG マップ
  ========================================================= */

  const mapObject = document.querySelector(".garden_map_svg");

  /*
   * 庭園SVGが存在しない場合は終了
   *
   * 本館だけの表示や、別ページで使用しても
   * エラーにならないようにする。
   */
  if (!mapObject) {
    console.warn("庭園マップSVGが見つかりません。");
    return;
  }

  /* =========================================================
     SVG 読み込み完了
  ========================================================= */

  mapObject.addEventListener("load", () => {
    const svgDocument = mapObject.contentDocument;

    /*
     * SVG内部にアクセスできない場合
     */
    if (!svgDocument) {
      console.warn("SVGのcontentDocumentを取得できませんでした。");

      return;
    }

    console.log("庭園マップSVGの読み込み成功");

    /* =======================================================
       SVG内のリンクを取得
    ======================================================= */

    const links = svgDocument.querySelectorAll("a");

    console.log(`庭園マップのクリックエリア：${links.length}個`);

    links.forEach((link) => {
      /*
       * クリック可能であることを示す
       */
      link.style.cursor = "pointer";

      /*
       * リンク内の図形を取得
       */
      const shape = link.querySelector("rect, path, polygon, circle, ellipse");

      /* =====================================================
         マウスオーバー
      ===================================================== */

      link.addEventListener("mouseenter", () => {
        if (!shape) return;

        shape.style.fill = "#ffffff";
        shape.style.fillOpacity = "0.18";
      });

      /* =====================================================
         マウスアウト
      ===================================================== */

      link.addEventListener("mouseleave", () => {
        if (!shape) return;

        shape.style.fill = "#000000";
        shape.style.fillOpacity = "0";
      });

      /* =====================================================
         クリック
      ===================================================== */

      link.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        /*
         * hrefを取得
         */
        const href = link.getAttribute("href");

        console.log("庭園マップクリック:", href);

        /*
         * hrefがない場合
         */
        if (!href) return;

        /*
         * #gallery
         * #yubatake
         * #jinja
         * などのページ内リンクだけ処理
         */
        if (!href.startsWith("#")) {
          return;
        }

        /*
         * 親ページから対象を探す
         */
        const target = document.querySelector(href);

        if (!target) {
          console.warn(`庭園マップのリンク先が見つかりません: ${href}`);

          return;
        }

        /* ===================================================
           対象の庭園コンテンツまでスクロール
        =================================================== */

        /*
         * 今までと同じく200px上に着地
         */
        const offset = 200;

        const targetPosition =
          target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      });
    });
  });

  /* =========================================================
     SVG 読み込みエラー
  ========================================================= */

  mapObject.addEventListener("error", () => {
    console.error("庭園マップSVGの読み込みに失敗しました。", mapObject.data);
  });
});
