"use strict";

/* =========================================================
   がしみや荘 ONLINE SHOP
   cart.js

   ・カート商品表示
   ・数量変更
   ・商品削除
   ・カート件数表示
   ・小計計算
   ・送料計算
   ・合計計算
   ・localStorage保存
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     DOM
  ====================================================== */

  const cartContent = document.getElementById("cartContent");

  const emptyCart = document.getElementById("emptyCart");

  const cartSummary = document.getElementById("cartSummary");

  const subtotalElement = document.getElementById("subtotal");

  const shippingElement = document.getElementById("shipping");

  const totalElement = document.getElementById("total");

  const cartCount = document.getElementById("cartCount");

  const checkoutButton = document.getElementById("checkoutButton");

  /* =====================================================
     商品データ確認
  ====================================================== */

  if (typeof products === "undefined" || !Array.isArray(products)) {
    console.error(
      "products.js が読み込まれていないか、products が定義されていません。",
    );

    if (cartContent) {
      cartContent.innerHTML = `
        <p class="cart_error">
          商品情報を読み込めませんでした。
        </p>
      `;
    }

    return;
  }

  /* =====================================================
     カートキー
  ====================================================== */

  const CART_KEY = "gashimiyasouCart";

  /* =====================================================
     カート取得
  ====================================================== */

  let cart = loadCart();

  /* =====================================================
     初期表示
  ====================================================== */

  renderCart();

  /* =====================================================
     カート読み込み
  ====================================================== */

  function loadCart() {
    try {
      const savedCart = localStorage.getItem(CART_KEY);

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      if (!Array.isArray(parsedCart)) {
        return [];
      }

      return parsedCart
        .filter((item) => item && item.id)
        .map((item) => ({
          id: String(item.id),
          quantity: Math.max(1, Number(item.quantity) || 1),
        }));
    } catch (error) {
      console.error("カート情報の読み込みに失敗しました。", error);

      return [];
    }
  }

  /* =====================================================
     カート保存
  ====================================================== */

  function saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("カート情報の保存に失敗しました。", error);
    }
  }

  /* =====================================================
     商品検索
  ====================================================== */

  function getProduct(productId) {
    return products.find((product) => String(product.id) === String(productId));
  }

  /* =====================================================
     カート表示
  ====================================================== */

  function renderCart() {
    if (!cartContent) {
      return;
    }

    /* -----------------------------------------------
       商品データが存在するものだけ残す
    ------------------------------------------------ */

    cart = cart.filter((item) => {
      const product = getProduct(item.id);

      return Boolean(product);
    });

    saveCart();

    /* -----------------------------------------------
       空のカート
    ------------------------------------------------ */

    if (cart.length === 0) {
      cartContent.innerHTML = "";

      if (emptyCart) {
        emptyCart.style.display = "block";
      }

      if (cartSummary) {
        cartSummary.style.display = "none";
      }

      updateCartCount();

      return;
    }

    /* -----------------------------------------------
       商品あり
    ------------------------------------------------ */

    if (emptyCart) {
      emptyCart.style.display = "none";
    }

    if (cartSummary) {
      cartSummary.style.display = "block";
    }

    cartContent.innerHTML = `

      <div class="cart_items">

        ${cart
          .map((item) => {
            const product = getProduct(item.id);

            if (!product) {
              return "";
            }

            return createCartItem(product, item.quantity);
          })
          .join("")}

      </div>

    `;

    bindCartEvents();

    updateCartSummary();

    updateCartCount();
  }

  /* =====================================================
     カート商品HTML
  ====================================================== */

  function createCartItem(product, quantity) {
    const itemTotal = Number(product.price) * Number(quantity);

    return `

      <article
        class="cart_item"
        data-product-id="${escapeHTML(product.id)}"
      >

        <!-- 商品画像 -->

        <a
          href="product.html?id=${encodeURIComponent(product.id)}"
          class="cart_item_image"
        >

          <img
            src="${escapeHTML(product.image)}"
            alt="${escapeHTML(product.name)}"
            loading="lazy"
            onerror="this.src='images/noimage.jpg';"
          />

        </a>


        <!-- 商品情報 -->

        <div class="cart_item_info">

          <p class="cart_item_category">
            ${escapeHTML(
              product.categoryName ||
                categoryNames[product.category] ||
                product.category ||
                "PRODUCT",
            )}
          </p>


          <h2 class="cart_item_name">

            <a
              href="product.html?id=${encodeURIComponent(product.id)}"
            >
              ${escapeHTML(product.name)}
            </a>

          </h2>


          <p class="cart_item_price">
            ¥${Number(product.price).toLocaleString()}
            <span>（税込）</span>
          </p>


          <!-- 数量 -->

          <div class="cart_item_controls">

            <div class="quantity_control">

              <button
                type="button"
                class="quantity_button quantity_minus"
                data-id="${escapeHTML(product.id)}"
                aria-label="${escapeHTML(product.name)}の数量を減らす"
              >
                −
              </button>

              <span
                class="quantity_value"
              >
                ${quantity}
              </span>

              <button
                type="button"
                class="quantity_button quantity_plus"
                data-id="${escapeHTML(product.id)}"
                aria-label="${escapeHTML(product.name)}の数量を増やす"
              >
                ＋
              </button>

            </div>


            <button
              type="button"
              class="remove_cart_button"
              data-id="${escapeHTML(product.id)}"
            >
              商品を削除
            </button>

          </div>

        </div>


        <!-- 商品小計 -->

        <div class="cart_item_total">

          <span>
            小計
          </span>

          <strong>
            ¥${itemTotal.toLocaleString()}
          </strong>

        </div>

      </article>

    `;
  }

  /* =====================================================
     カートイベント
  ====================================================== */

  function bindCartEvents() {
    /* -----------------------------------------------
       数量を減らす
    ------------------------------------------------ */

    const minusButtons = document.querySelectorAll(".quantity_minus");

    minusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.id;

        changeQuantity(productId, -1);
      });
    });

    /* -----------------------------------------------
       数量を増やす
    ------------------------------------------------ */

    const plusButtons = document.querySelectorAll(".quantity_plus");

    plusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.id;

        changeQuantity(productId, 1);
      });
    });

    /* -----------------------------------------------
       商品削除
    ------------------------------------------------ */

    const removeButtons = document.querySelectorAll(".remove_cart_button");

    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.id;

        removeProduct(productId);
      });
    });
  }

  /* =====================================================
     数量変更
  ====================================================== */

  function changeQuantity(productId, change) {
    const item = cart.find(
      (cartItem) => String(cartItem.id) === String(productId),
    );

    if (!item) {
      return;
    }

    item.quantity += change;

    /* -----------------------------------------------
       0以下になったら削除
    ------------------------------------------------ */

    if (item.quantity <= 0) {
      cart = cart.filter(
        (cartItem) => String(cartItem.id) !== String(productId),
      );
    }

    saveCart();

    renderCart();
  }

  /* =====================================================
     商品削除
  ====================================================== */

  function removeProduct(productId) {
    cart = cart.filter((item) => String(item.id) !== String(productId));

    saveCart();

    renderCart();
  }

  /* =====================================================
     小計・送料・合計
  ====================================================== */

  function updateCartSummary() {
    let subtotal = 0;

    cart.forEach((item) => {
      const product = getProduct(item.id);

      if (!product) {
        return;
      }

      subtotal += Number(product.price) * Number(item.quantity);
    });

    /* -----------------------------------------------
       送料
       
       5,000円以上 → 送料無料
       5,000円未満 → 800円
    ------------------------------------------------ */

    let shipping = 0;

    if (subtotal > 0 && subtotal < 5000) {
      shipping = 800;
    }

    const total = subtotal + shipping;

    if (subtotalElement) {
      subtotalElement.textContent = subtotal.toLocaleString();
    }

    if (shippingElement) {
      if (shipping === 0) {
        shippingElement.textContent = "無料";
      } else {
        shippingElement.textContent = shipping.toLocaleString();
      }
    }

    if (totalElement) {
      totalElement.textContent = total.toLocaleString();
    }
  }

  /* =====================================================
     カート件数
  ====================================================== */

  function updateCartCount() {
    if (!cartCount) {
      return;
    }

    const totalQuantity = cart.reduce(
      (total, item) => total + Number(item.quantity || 0),
      0,
    );

    cartCount.textContent = totalQuantity;
  }

  /* =====================================================
     購入手続きボタン
  ====================================================== */

  if (checkoutButton) {
    checkoutButton.addEventListener("click", (event) => {
      if (cart.length === 0) {
        event.preventDefault();

        alert("カートに商品がありません。");
      }
    });
  }

  /* =====================================================
     HTMLエスケープ
  ====================================================== */

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
