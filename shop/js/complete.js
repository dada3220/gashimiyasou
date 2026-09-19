"use strict";

/* =========================================================
   がしみや荘 オンラインショップ
   complete.js

   ・注文情報取得
   ・注文番号表示
   ・商品表示
   ・合計金額表示
   ・お届け先表示
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
     DOM
  ====================================================== */

  const orderNumberElement = document.getElementById("orderNumber");

  const completeItems = document.getElementById("completeItems");

  const completeSubtotal = document.getElementById("completeSubtotal");

  const completeShipping = document.getElementById("completeShipping");

  const completeTotal = document.getElementById("completeTotal");

  const customerName = document.getElementById("customerName");

  const customerPostal = document.getElementById("customerPostal");

  const customerAddress = document.getElementById("customerAddress");

  const customerPhone = document.getElementById("customerPhone");

  const customerEmail = document.getElementById("customerEmail");

  const customerPayment = document.getElementById("customerPayment");

  const cartCount = document.getElementById("cartCount");

  /* =====================================================
     注文情報
  ====================================================== */

  const ORDER_KEY = "gashimiyasouOrder";

  let order = null;

  try {
    const savedOrder = localStorage.getItem(ORDER_KEY);

    if (savedOrder) {
      order = JSON.parse(savedOrder);
    }
  } catch (error) {
    console.error("注文情報の読み込みに失敗しました。", error);
  }

  /* =====================================================
     注文情報がない場合
  ====================================================== */

  if (!order || !order.orderNumber) {
    showOrderNotFound();

    updateCartCount();

    return;
  }

  /* =====================================================
     表示
  ====================================================== */

  renderOrder();

  updateCartCount();

  /* =====================================================
     注文表示
  ====================================================== */

  function renderOrder() {
    /* -----------------------------------------------
       注文番号
    ------------------------------------------------ */

    if (orderNumberElement) {
      orderNumberElement.textContent = order.orderNumber;
    }

    /* -----------------------------------------------
       商品
    ------------------------------------------------ */

    if (completeItems) {
      const items = Array.isArray(order.items) ? order.items : [];

      completeItems.innerHTML = items
        .map((item) => {
          const price = Number(item.price) || 0;

          const quantity = Number(item.quantity) || 1;

          const itemTotal = price * quantity;

          return `

              <div class="complete_item">

                <div class="complete_item_image">

                  <img
                    src="${escapeHTML(item.image || "images/noimage.jpg")}"
                    alt="${escapeHTML(item.name)}"
                    onerror="this.src='images/noimage.jpg';"
                  />

                </div>


                <div>

                  <p class="complete_item_name">
                    ${escapeHTML(item.name)}
                  </p>

                  <p class="complete_item_quantity">
                    ¥${price.toLocaleString()}
                    × ${quantity}点
                  </p>

                </div>


                <p class="complete_item_price">
                  ¥${itemTotal.toLocaleString()}
                </p>

              </div>

            `;
        })
        .join("");
    }

    /* -----------------------------------------------
       金額
    ------------------------------------------------ */

    if (completeSubtotal) {
      completeSubtotal.textContent = Number(
        order.subtotal || 0,
      ).toLocaleString();
    }

    if (completeShipping) {
      const shipping = Number(order.shipping || 0);

      completeShipping.textContent =
        shipping === 0 ? "無料" : `¥${shipping.toLocaleString()}`;
    }

    if (completeTotal) {
      completeTotal.textContent = Number(order.total || 0).toLocaleString();
    }

    /* -----------------------------------------------
       お客様情報
    ------------------------------------------------ */

    const customer = order.customer || {};

    if (customerName) {
      customerName.textContent = customer.name || "-";
    }

    if (customerPostal) {
      customerPostal.textContent = customer.postal || "-";
    }

    if (customerAddress) {
      const address = [
        customer.prefecture || "",

        customer.city || "",

        customer.address || "",

        customer.building || "",
      ]
        .filter(Boolean)
        .join(" ");

      customerAddress.textContent = address || "-";
    }

    if (customerPhone) {
      customerPhone.textContent = customer.phone || "-";
    }

    if (customerEmail) {
      customerEmail.textContent = customer.email || "-";
    }

    if (customerPayment) {
      customerPayment.textContent = customer.payment || "-";
    }

    document.title = `${order.orderNumber} | ご注文ありがとうございます | がしみや荘 ONLINE SHOP`;
  }

  /* =====================================================
     カート件数
  ====================================================== */

  function updateCartCount() {
    if (!cartCount) {
      return;
    }

    try {
      const savedCart = localStorage.getItem("gashimiyasouCart");

      if (!savedCart) {
        cartCount.textContent = "0";

        return;
      }

      const cart = JSON.parse(savedCart);

      if (!Array.isArray(cart)) {
        cartCount.textContent = "0";

        return;
      }

      const totalQuantity = cart.reduce(
        (total, item) => total + (Number(item.quantity) || 0),
        0,
      );

      cartCount.textContent = totalQuantity;
    } catch (error) {
      cartCount.textContent = "0";
    }
  }

  /* =====================================================
     注文情報がない
  ====================================================== */

  function showOrderNotFound() {
    const completePage = document.querySelector(".complete_page");

    if (!completePage) {
      return;
    }

    completePage.innerHTML = `

      <div class="complete_inner">

        <div class="complete_error">

          <p class="complete_label">
            ORDER INFORMATION
          </p>

          <h1>
            注文情報が見つかりません
          </h1>

          <p>
            注文情報が存在しないか、<br />
            ブラウザの保存情報が削除された可能性があります。
          </p>

          <div class="complete_buttons">

            <a
              href="index.html"
              class="complete_button complete_button_primary"
            >

              <span>
                BACK TO SHOP
              </span>

              <strong>
                ショップへ戻る
              </strong>

            </a>

          </div>

        </div>

      </div>

    `;
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
