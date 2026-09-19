"use strict";

/* =========================================================
   がしみや荘 オンラインショップ
   checkout.js

   ・カート確認
   ・注文内容表示
   ・合計金額計算
   ・送料計算
   ・購入者情報入力
   ・入力チェック
   ・注文番号生成
   ・注文情報保存
   ・カートクリア
   ・complete.htmlへ移動
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     DOM
  ====================================================== */

  const checkoutContent = document.getElementById("checkoutContent");

  const checkoutEmpty = document.getElementById("checkoutEmpty");

  const checkoutForm = document.getElementById("checkoutForm");

  const checkoutOrderItems = document.getElementById("checkoutOrderItems");

  const checkoutSubtotal = document.getElementById("checkoutSubtotal");

  const checkoutShipping = document.getElementById("checkoutShipping");

  const checkoutTotal = document.getElementById("checkoutTotal");

  const cartCount = document.getElementById("cartCount");

  /* =====================================================
     定数
  ====================================================== */

  const CART_KEY = "gashimiyasouCart";

  const ORDER_KEY = "gashimiyasouOrder";

  /* =====================================================
     商品データ確認
  ====================================================== */

  if (typeof products === "undefined" || !Array.isArray(products)) {
    console.error("products.js が読み込まれていません。");

    return;
  }

  /* =====================================================
     カート取得
  ====================================================== */

  let cart = getCart();

  /* =====================================================
     商品がない場合
  ====================================================== */

  if (cart.length === 0) {
    if (checkoutContent) {
      checkoutContent.style.display = "none";
    }

    if (checkoutEmpty) {
      checkoutEmpty.style.display = "block";
    }

    updateCartCount();

    return;
  }

  /* =====================================================
     初期処理
  ====================================================== */

  renderOrderItems();

  updateCartCount();

  /* =====================================================
     注文内容表示
  ====================================================== */

  function renderOrderItems() {
    if (!checkoutOrderItems) {
      return;
    }

    let subtotal = 0;

    checkoutOrderItems.innerHTML = cart
      .map((cartItem) => {
        const product = getProduct(cartItem.id);

        if (!product) {
          return "";
        }

        const quantity = Number(cartItem.quantity) || 1;

        const itemTotal = Number(product.price) * quantity;

        subtotal += itemTotal;

        return `

            <div class="checkout_order_item">

              <div class="checkout_order_image">

                <img
                  src="${escapeHTML(product.image)}"
                  alt="${escapeHTML(product.name)}"
                  onerror="this.src='images/noimage.jpg';"
                />

              </div>

              <div>

                <p class="checkout_order_name">
                  ${escapeHTML(product.name)}
                </p>

                <p class="checkout_order_quantity">
                  数量：${quantity}
                </p>

                <p class="checkout_order_price">
                  ¥${itemTotal.toLocaleString()}
                </p>

              </div>

            </div>

          `;
      })
      .join("");

    /* ===================================================
       送料
    ================================================== */

    let shipping = 0;

    if (subtotal > 0 && subtotal < 5000) {
      shipping = 800;
    }

    const total = subtotal + shipping;

    /* ===================================================
       金額表示
    ================================================== */

    if (checkoutSubtotal) {
      checkoutSubtotal.textContent = subtotal.toLocaleString();
    }

    if (checkoutShipping) {
      checkoutShipping.textContent =
        shipping === 0 ? "無料" : `¥${shipping.toLocaleString()}`;
    }

    if (checkoutTotal) {
      checkoutTotal.textContent = total.toLocaleString();
    }
  }

  /* =====================================================
     フォーム送信
  ====================================================== */

  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (event) => {
      event.preventDefault();

      /* -----------------------------------------------
           入力チェック
        ------------------------------------------------ */

      const isValid = validateForm();

      if (!isValid) {
        const firstError = checkoutForm.querySelector(
          ".checkout_form_group.error input, " +
            ".checkout_form_group.error select",
        );

        if (firstError) {
          firstError.focus();

          firstError.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

        return;
      }

      /* -----------------------------------------------
           フォームデータ取得
        ------------------------------------------------ */

      const formData = new FormData(checkoutForm);

      const customer = {
        name: formData.get("name") || "",

        postal: formData.get("postal") || "",

        prefecture: formData.get("prefecture") || "",

        city: formData.get("city") || "",

        address: formData.get("address") || "",

        building: formData.get("building") || "",

        phone: formData.get("phone") || "",

        email: formData.get("email") || "",

        payment: formData.get("payment") || "クレジットカード",

        note: formData.get("note") || "",
      };

      /* -----------------------------------------------
           金額計算
        ------------------------------------------------ */

      const totals = calculateTotals();

      /* -----------------------------------------------
           注文番号
        ------------------------------------------------ */

      const orderNumber = generateOrderNumber();

      /* -----------------------------------------------
           注文情報
        ------------------------------------------------ */

      const order = {
        orderNumber: orderNumber,

        orderedAt: new Date().toISOString(),

        customer: customer,

        items: cart.map((cartItem) => {
          const product = getProduct(cartItem.id);

          return {
            id: cartItem.id,

            name: product ? product.name : "",

            price: product ? Number(product.price) : 0,

            quantity: Number(cartItem.quantity) || 1,

            image: product ? product.image : "",
          };
        }),

        subtotal: totals.subtotal,

        shipping: totals.shipping,

        total: totals.total,
      };

      /* -----------------------------------------------
           注文情報保存
        ------------------------------------------------ */

      try {
        localStorage.setItem(ORDER_KEY, JSON.stringify(order));
      } catch (error) {
        console.error("注文情報の保存に失敗しました。", error);

        alert("注文情報を保存できませんでした。もう一度お試しください。");

        return;
      }

      /* -----------------------------------------------
           カートを空にする
        ------------------------------------------------ */

      localStorage.removeItem(CART_KEY);

      /* -----------------------------------------------
           完了ページへ
        ------------------------------------------------ */

      window.location.href = `complete.html?order=${encodeURIComponent(orderNumber)}`;
    });
  }

  /* =====================================================
     入力チェック
  ====================================================== */

  function validateForm() {
    let valid = true;

    /* -----------------------------------------------
       必須項目
    ------------------------------------------------ */

    const requiredFields = [
      "name",
      "postal",
      "prefecture",
      "city",
      "address",
      "phone",
      "email",
    ];

    requiredFields.forEach((fieldId) => {
      const field = document.getElementById(fieldId);

      if (!field) {
        return;
      }

      const group = field.closest(".checkout_form_group");

      if (!field.value.trim()) {
        valid = false;

        if (group) {
          group.classList.add("error");
        }
      } else {
        if (group) {
          group.classList.remove("error");
        }
      }
    });

    /* -----------------------------------------------
       メールアドレス
    ------------------------------------------------ */

    const email = document.getElementById("email");

    if (email && email.value.trim() !== "") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const emailGroup = email.closest(".checkout_form_group");

      if (!emailPattern.test(email.value.trim())) {
        valid = false;

        if (emailGroup) {
          emailGroup.classList.add("error");

          const error = emailGroup.querySelector(".form_error");

          if (error) {
            error.textContent = "正しいメールアドレスを入力してください。";
          }
        }
      }
    }

    /* -----------------------------------------------
       郵便番号
    ------------------------------------------------ */

    const postal = document.getElementById("postal");

    if (postal && postal.value.trim() !== "") {
      const postalPattern = /^\d{3}-?\d{4}$/;

      const postalGroup = postal.closest(".checkout_form_group");

      if (!postalPattern.test(postal.value.trim())) {
        valid = false;

        if (postalGroup) {
          postalGroup.classList.add("error");

          const error = postalGroup.querySelector(".form_error");

          if (error) {
            error.textContent =
              "郵便番号は「123-4567」の形式で入力してください。";
          }
        }
      }
    }

    /* -----------------------------------------------
       電話番号
    ------------------------------------------------ */

    const phone = document.getElementById("phone");

    if (phone && phone.value.trim() !== "") {
      const phonePattern = /^[0-9０-９\-ー－\s]{10,15}$/;

      const phoneGroup = phone.closest(".checkout_form_group");

      if (!phonePattern.test(phone.value.trim())) {
        valid = false;

        if (phoneGroup) {
          phoneGroup.classList.add("error");

          const error = phoneGroup.querySelector(".form_error");

          if (error) {
            error.textContent = "正しい電話番号を入力してください。";
          }
        }
      }
    }

    return valid;
  }

  /* =====================================================
     金額計算
  ====================================================== */

  function calculateTotals() {
    let subtotal = 0;

    cart.forEach((cartItem) => {
      const product = getProduct(cartItem.id);

      if (!product) {
        return;
      }

      subtotal += Number(product.price) * (Number(cartItem.quantity) || 1);
    });

    const shipping = subtotal > 0 && subtotal < 5000 ? 800 : 0;

    return {
      subtotal: subtotal,

      shipping: shipping,

      total: subtotal + shipping,
    };
  }

  /* =====================================================
     商品検索
  ====================================================== */

  function getProduct(productId) {
    return products.find((product) => String(product.id) === String(productId));
  }

  /* =====================================================
     カート取得
  ====================================================== */

  function getCart() {
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
     カート件数
  ====================================================== */

  function updateCartCount() {
    if (!cartCount) {
      return;
    }

    const totalQuantity = cart.reduce(
      (total, item) => total + (Number(item.quantity) || 0),
      0,
    );

    cartCount.textContent = totalQuantity;
  }

  /* =====================================================
     注文番号生成
  ====================================================== */

  function generateOrderNumber() {
    const now = new Date();

    const year = now.getFullYear();

    const month = String(now.getMonth() + 1).padStart(2, "0");

    const day = String(now.getDate()).padStart(2, "0");

    const random = Math.floor(1000 + Math.random() * 9000);

    return `GSM-${year}${month}${day}-${random}`;
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
