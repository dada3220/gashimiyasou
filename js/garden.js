/* =========================================================
   がしみや荘 庭園ページ
   garden.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const mapObject = document.querySelector(".garden_map_svg");

  // SVGが存在しない場合は終了
  if (!mapObject) {
    console.warn("庭園マップSVGが見つかりません。");
    return;
  }

  /*
   * SVGの読み込み完了後
   */
  mapObject.addEventListener("load", () => {
    const svgDocument = mapObject.contentDocument;

    // SVG内部にアクセスできない場合
    if (!svgDocument) {
      console.warn("SVGのcontentDocumentを取得できませんでした。");
      return;
    }

    console.log("庭園マップSVGの読み込み成功");

    /*
     * SVG内のリンクを取得
     */
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

      /*
       * -------------------------
       * マウスオーバー
       * -------------------------
       */
      link.addEventListener("mouseenter", () => {
        if (!shape) return;

        shape.style.fill = "#ffffff";
        shape.style.fillOpacity = "0.18";
      });

      /*
       * -------------------------
       * マウスアウト
       * -------------------------
       */
      link.addEventListener("mouseleave", () => {
        if (!shape) return;

        shape.style.fill = "#000000";
        shape.style.fillOpacity = "0";
      });

      /*
       * -------------------------
       * クリック
       * -------------------------
       */
      link.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        /*
         * hrefを取得
         */
        const href = link.getAttribute("href");

        console.log("庭園マップクリック:", href);

        if (!href) return;

        /*
         * #gallery
         * #yubatake
         * #jinja
         * など
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

        /*
         * スクロール
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

  /*
   * SVGの読み込みに失敗した場合
   */
  mapObject.addEventListener("error", () => {
    console.error("庭園マップSVGの読み込みに失敗しました。", mapObject.data);
  });
});
