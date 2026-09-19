"use strict";

/* =========================================================
   がしみや荘 ONLINE SHOP
   shop.js

   ・おすすめ商品表示
   ・商品一覧表示
   ・カテゴリー絞り込み
   ・商品検索
   ・価格順ソート
   ・商品名順ソート
   ・カート件数表示
   ・カテゴリーカード連動
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     DOM
  ========================================================= */

  const recommendProducts = document.getElementById("recommendProducts");

  const productList = document.getElementById("productList");

  const productCount = document.getElementById("productCount");

  const noProducts = document.getElementById("noProducts");

  const searchInput = document.getElementById("searchInput");

  const sortSelect = document.getElementById("sortSelect");

  const cartCount = document.getElementById("cartCount");

  const showAllButton = document.getElementById("showAllButton");

  const filterButtons = document.querySelectorAll(".filter_button");

  const categoryCards = document.querySelectorAll(".category_card");

  const seasonalButtons = document.querySelectorAll(
    '[data-category="seasonal"]',
  );

  /* =========================================================
     状態
  ========================================================= */

  let currentCategory = "all";
  let currentKeyword = "";
  let currentSort = "default";

  /* =========================================================
     商品データ確認
  ========================================================= */

  if (typeof products === "undefined" || !Array.isArray(products)) {
    console.error(
      "products.js が読み込まれていないか、products が定義されていません。",
    );

    if (productList) {
      productList.innerHTML = `
        <p style="
          grid-column: 1 / -1;
          padding: 80px 20px;
          color: #777;
          text-align: center;
        ">
          商品情報を読み込めませんでした。
        </p>
      `;
    }

    return;
  }

  console.log(
    `がしみや荘 ONLINE SHOP：${products.length}件の商品を読み込みました。`,
  );

  /* =========================================================
     初期表示
  ========================================================= */

  renderRecommendProducts();

  renderProducts();

  updateCartCount();

  /* =========================================================
     おすすめ商品
  ========================================================= */

  function renderRecommendProducts() {
    if (!recommendProducts) {
      return;
    }

    const recommended = products.filter(
      (product) => product.recommend === true,
    );

    /*
      おすすめ商品がない場合
    */

    if (recommended.length === 0) {
      recommendProducts.innerHTML = `
        <p style="
          grid-column: 1 / -1;
          color: #777;
        ">
          おすすめの商品はありません。
        </p>
      `;

      return;
    }

    /*
      最大4商品
    */

    const displayProducts = recommended.slice(0, 4);

    recommendProducts.innerHTML = displayProducts
      .map((product) => createProductCard(product))
      .join("");
  }

  /* =========================================================
     商品一覧
  ========================================================= */

  function renderProducts() {
    if (!productList) {
      return;
    }

    /*
      商品をコピー
      元のproducts配列を直接変更しない
    */

    let filteredProducts = [...products];

    /* =======================================================
       カテゴリー絞り込み
    ======================================================= */

    if (currentCategory !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === currentCategory,
      );
    }

    /* =======================================================
       キーワード検索
    ======================================================= */

    if (currentKeyword !== "") {
      filteredProducts = filteredProducts.filter((product) => {
        const name = product.name || "";

        const description = product.description || "";

        const category = product.categoryName || "";

        const keyword = currentKeyword.toLowerCase();

        return (
          name.toLowerCase().includes(keyword) ||
          description.toLowerCase().includes(keyword) ||
          category.toLowerCase().includes(keyword)
        );
      });
    }

    /* =======================================================
       ソート
    ======================================================= */

    switch (currentSort) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;

      case "name":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name, "ja"));
        break;

      case "default":
      default:
        /*
          products.js の並び順を維持
        */
        break;
    }

    /* =======================================================
       商品件数
    ======================================================= */

    if (productCount) {
      productCount.textContent = `${filteredProducts.length} ITEMS`;
    }

    /* =======================================================
       商品なし
    ======================================================= */

    if (filteredProducts.length === 0) {
      productList.innerHTML = "";

      if (noProducts) {
        noProducts.style.display = "block";
      }

      return;
    }

    if (noProducts) {
      noProducts.style.display = "none";
    }

    /* =======================================================
       商品表示
    ======================================================= */

    productList.innerHTML = filteredProducts
      .map((product) => createProductCard(product))
      .join("");
  }

  /* =========================================================
     商品カード生成
  ========================================================= */

  function createProductCard(product) {
    const categoryName =
      product.categoryName ||
      categoryNames[product.category] ||
      product.category ||
      "PRODUCT";

    const badge = product.badge
      ? `
          <span class="product_badge">
            ${escapeHTML(product.badge)}
          </span>
        `
      : "";

    return `
      <article class="product_card">

        <a
          href="product.html?id=${encodeURIComponent(product.id)}"
          class="product_card_link"
        >

          <div class="product_image">

            ${badge}

            <img
              src="${escapeHTML(product.image)}"
              alt="${escapeHTML(product.name)}"
              loading="lazy"
              onerror="this.src='images/noimage.jpg';"
            />

          </div>

          <div class="product_info">

            <p class="product_category">
              ${escapeHTML(categoryName)}
            </p>

            <h3 class="product_name">
              ${escapeHTML(product.name)}
            </h3>

            <p class="product_price">
              ¥${Number(product.price).toLocaleString()}
              <span>（税込）</span>
            </p>

            <span class="product_link">
              VIEW PRODUCT →
            </span>

          </div>

        </a>

      </article>
    `;
  }

  /* =========================================================
     カテゴリー切り替え
  ========================================================= */

  function changeCategory(category) {
    currentCategory = category;

    /*
      フィルターボタンのactive変更
    */

    filterButtons.forEach((button) => {
      const buttonCategory = button.dataset.category;

      button.classList.toggle("active", buttonCategory === category);
    });

    renderProducts();

    /*
      商品一覧までスクロール
    */

    const shopItems = document.getElementById("shopItems");

    if (shopItems) {
      shopItems.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  /* =========================================================
     フィルターボタン
  ========================================================= */

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category || "all";

      changeCategory(category);
    });
  });

  /* =========================================================
     CATEGORY 大きなカード
  ========================================================= */

  categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const category = card.dataset.category || "all";

      changeCategory(category);
    });
  });

  /* =========================================================
     季節限定ボタン
  ========================================================= */

  seasonalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;

      if (category === "seasonal") {
        changeCategory("seasonal");
      }
    });
  });

  /* =========================================================
     検索
  ========================================================= */

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      currentKeyword = searchInput.value.trim().toLowerCase();

      renderProducts();
    });
  }

  /* =========================================================
     ソート
  ========================================================= */

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      currentSort = sortSelect.value;

      renderProducts();
    });
  }

  /* =========================================================
     「すべて見る」
  ========================================================= */

  if (showAllButton) {
    showAllButton.addEventListener("click", () => {
      currentCategory = "all";
      currentKeyword = "";

      if (searchInput) {
        searchInput.value = "";
      }

      if (sortSelect) {
        sortSelect.value = "default";
      }

      filterButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.category === "all");
      });

      renderProducts();

      const shopItems = document.getElementById("shopItems");

      if (shopItems) {
        shopItems.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  /* =========================================================
     カート件数
  ========================================================= */

  function updateCartCount() {
    if (!cartCount) {
      return;
    }

    let cart = [];

    try {
      const savedCart = localStorage.getItem("gashimiyasouCart");

      if (savedCart) {
        cart = JSON.parse(savedCart);
      }

      if (!Array.isArray(cart)) {
        cart = [];
      }
    } catch (error) {
      console.error("カート情報の読み込みに失敗しました。", error);

      cart = [];
    }

    const totalQuantity = cart.reduce(
      (total, item) => total + (Number(item.quantity) || 0),
      0,
    );

    cartCount.textContent = totalQuantity;
  }

  /* =========================================================
     HTMLエスケープ
  ========================================================= */

  function escapeHTML(value) {
    if (value === null || value === undefined) {
      return "";
    }

    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});
