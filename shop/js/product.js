"use strict";

/* =========================================================
   がしみや荘 オンラインショップ
   product.js

   ・URLの商品ID取得
   ・商品詳細表示
   ・数量変更
   ・カート追加
   ・カート件数更新
   ・関連商品表示
   ・商品が存在しない場合の処理
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     DOM
  ========================================================= */

  const productDetail = document.getElementById("productDetail");
  const relatedProducts = document.getElementById("relatedProducts");
  const cartCount = document.getElementById("cartCount");

  /* =========================================================
     URLから商品IDを取得
  ========================================================= */

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  /* =========================================================
     商品検索
  ========================================================= */

  const product = products.find((item) => item.id === productId);

  /* =========================================================
     商品が存在しない場合
  ========================================================= */

  if (!product) {
    showProductNotFound();
    updateCartCount();
    return;
  }

  /* =========================================================
     商品詳細を表示
  ========================================================= */

  renderProduct(product);

  /* =========================================================
     関連商品を表示
  ========================================================= */

  renderRelatedProducts(product);

  /* =========================================================
     カート件数を更新
  ========================================================= */

  updateCartCount();

  /* =========================================================
     商品詳細表示
  ========================================================= */

  function renderProduct(item) {
    const categoryName =
      categoryNames[item.category] || item.category || "商品";

    document.title = `${item.name} | がしみや荘 オンラインショップ`;

    /* パンくず */
    const breadcrumbProduct = document.getElementById("breadcrumbProduct");

    if (breadcrumbProduct) {
      breadcrumbProduct.textContent = item.name;
    }

    /* 商品HTML */

    productDetail.innerHTML = `
      <div class="product_image_area">

        <div class="product_image">
          <img
            src="${item.image}"
            alt="${item.name}"
            onerror="this.src='images/noimage.jpg';"
          />
        </div>

      </div>

      <div class="product_info">

        <p class="product_category">
          ${categoryName}
        </p>

        ${
          item.recommend
            ? `
              <span class="product_badge">
                RECOMMEND
              </span>
            `
            : ""
        }

        <h1 class="product_name">
          ${item.name}
        </h1>

        <p class="product_price">
          ¥${item.price.toLocaleString()}
          <span>（税込）</span>
        </p>

        <div class="product_description">
          <p>
            ${item.description || "がしみや荘オリジナルの商品です。"}
          </p>
        </div>

        <div class="product_purchase">

          <div class="quantity_area">

            <p class="quantity_label">
              数量
            </p>

            <div class="quantity_control">

              <button
                type="button"
                class="quantity_button"
                id="quantityMinus"
                aria-label="数量を減らす"
              >
                −
              </button>

              <input
                type="number"
                id="quantity"
                class="quantity_input"
                value="1"
                min="1"
                max="99"
                inputmode="numeric"
                aria-label="数量"
              />

              <button
                type="button"
                class="quantity_button"
                id="quantityPlus"
                aria-label="数量を増やす"
              >
                ＋
              </button>

            </div>

          </div>

          <button
            type="button"
            class="add_cart_button"
            id="addCartButton"
          >
            <span>ADD TO CART</span>
            <strong>カートに入れる</strong>
          </button>

        </div>

        <p
          class="cart_message"
          id="cartMessage"
          aria-live="polite"
        ></p>

        <div class="product_meta">

          <div class="meta_item">
            <span>商品番号</span>
            <strong>${item.id}</strong>
          </div>

          <div class="meta_item">
            <span>カテゴリー</span>
            <strong>${categoryName}</strong>
          </div>

        </div>

      </div>
    `;

    setupQuantityControls();
    setupAddCart(item);
  }

  /* =========================================================
     数量コントロール
  ========================================================= */

  function setupQuantityControls() {
    const quantityInput = document.getElementById("quantity");
    const quantityMinus = document.getElementById("quantityMinus");
    const quantityPlus = document.getElementById("quantityPlus");

    if (!quantityInput || !quantityMinus || !quantityPlus) {
      return;
    }

    /* マイナス */
    quantityMinus.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value, 10) || 1;

      quantity--;

      if (quantity < 1) {
        quantity = 1;
      }

      quantityInput.value = quantity;
    });

    /* プラス */
    quantityPlus.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value, 10) || 1;

      quantity++;

      if (quantity > 99) {
        quantity = 99;
      }

      quantityInput.value = quantity;
    });

    /* 手入力 */
    quantityInput.addEventListener("change", () => {
      let quantity = parseInt(quantityInput.value, 10) || 1;

      if (quantity < 1) {
        quantity = 1;
      }

      if (quantity > 99) {
        quantity = 99;
      }

      quantityInput.value = quantity;
    });
  }

  /* =========================================================
     カート追加
  ========================================================= */

  function setupAddCart(item) {
    const addCartButton = document.getElementById("addCartButton");
    const quantityInput = document.getElementById("quantity");
    const cartMessage = document.getElementById("cartMessage");

    if (!addCartButton || !quantityInput) {
      return;
    }

    addCartButton.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value, 10) || 1;

      if (quantity < 1) {
        quantity = 1;
      }

      if (quantity > 99) {
        quantity = 99;
      }

      /* 現在のカートを取得 */

      let cart = getCart();

      /* 同じ商品が既に入っているか確認 */

      const existingItem = cart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        existingItem.quantity += quantity;

        /* 最大99個 */

        if (existingItem.quantity > 99) {
          existingItem.quantity = 99;
        }
      } else {
        cart.push({
          id: item.id,
          quantity: quantity,
        });
      }

      /* 保存 */

      saveCart(cart);

      /* カート件数更新 */

      updateCartCount();

      /* メッセージ */

      if (cartMessage) {
        cartMessage.textContent = `${item.name}を${quantity}点、カートに追加しました。`;

        cartMessage.classList.add("show");

        setTimeout(() => {
          cartMessage.classList.remove("show");
        }, 3000);
      }

      /* ボタン表示 */

      const originalHTML = addCartButton.innerHTML;

      addCartButton.classList.add("added");

      addCartButton.innerHTML = `
        <span>ADDED</span>
        <strong>カートに追加しました</strong>
      `;

      setTimeout(() => {
        addCartButton.classList.remove("added");
        addCartButton.innerHTML = originalHTML;
      }, 2000);
    });
  }

  /* =========================================================
     関連商品
  ========================================================= */

  function renderRelatedProducts(currentProduct) {
    if (!relatedProducts) {
      return;
    }

    /*
      同じカテゴリーの商品を優先。
      現在の商品自身は除外。
    */

    let related = products.filter(
      (item) =>
        item.id !== currentProduct.id &&
        item.category === currentProduct.category,
    );

    /*
      同じカテゴリーが少ない場合は、
      他カテゴリーの商品も追加。
    */

    if (related.length < 4) {
      const additionalProducts = products.filter(
        (item) =>
          item.id !== currentProduct.id &&
          !related.some((relatedItem) => relatedItem.id === item.id),
      );

      related = [...related, ...additionalProducts];
    }

    /* 最大4商品 */

    related = related.slice(0, 4);

    /* 商品がない場合 */

    if (related.length === 0) {
      relatedProducts.innerHTML = `
        <p class="related_empty">
          関連商品はありません。
        </p>
      `;

      return;
    }

    /* HTML生成 */

    relatedProducts.innerHTML = related
      .map((item) => {
        const categoryName =
          categoryNames[item.category] || item.category || "商品";

        return `
          <article class="related_card">

            <a
              href="product.html?id=${encodeURIComponent(item.id)}"
              class="related_link"
            >

              <div class="related_image">
                <img
                  src="${item.image}"
                  alt="${item.name}"
                  loading="lazy"
                  onerror="this.src='images/noimage.jpg';"
                />
              </div>

              <div class="related_text">

                <p class="related_category">
                  ${categoryName}
                </p>

                <h3>
                  ${item.name}
                </h3>

                <p class="related_price">
                  ¥${item.price.toLocaleString()}
                  <span>（税込）</span>
                </p>

              </div>

            </a>

          </article>
        `;
      })
      .join("");
  }

  /* =========================================================
     カート取得
  ========================================================= */

  function getCart() {
    try {
      const cartData = localStorage.getItem("gashimiyasouCart");

      if (!cartData) {
        return [];
      }

      const cart = JSON.parse(cartData);

      if (!Array.isArray(cart)) {
        return [];
      }

      return cart;
    } catch (error) {
      console.error("カート情報の読み込みに失敗しました。", error);

      return [];
    }
  }

  /* =========================================================
     カート保存
  ========================================================= */

  function saveCart(cart) {
    try {
      localStorage.setItem("gashimiyasouCart", JSON.stringify(cart));
    } catch (error) {
      console.error("カート情報の保存に失敗しました。", error);
    }
  }

  /* =========================================================
     カート件数
  ========================================================= */

  function updateCartCount() {
    if (!cartCount) {
      return;
    }

    const cart = getCart();

    const totalQuantity = cart.reduce((total, item) => {
      return total + (Number(item.quantity) || 0);
    }, 0);

    cartCount.textContent = totalQuantity;

    /*
      商品が0個なら非表示
    */

    if (totalQuantity === 0) {
      cartCount.classList.remove("show");
    } else {
      cartCount.classList.add("show");
    }
  }

  /* =========================================================
     商品が見つからない場合
  ========================================================= */

  function showProductNotFound() {
    document.title = "商品が見つかりません | がしみや荘 オンラインショップ";

    if (!productDetail) {
      return;
    }

    productDetail.innerHTML = `
      <div class="product_not_found">

        <p class="not_found_label">
          PRODUCT NOT FOUND
        </p>

        <h1>
          商品が見つかりません
        </h1>

        <p>
          お探しの商品は存在しないか、
          ページが移動・削除された可能性があります。
        </p>

        <a
          href="index.html"
          class="back_shop_button"
        >
          <span>BACK TO SHOP</span>
          <strong>ショップへ戻る</strong>
        </a>

      </div>
    `;
  }
});
