"use strict";

/* =========================================================
がしみや荘 SHOP PAGE
shop.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
  SCROLL ANIMATION
  ======================================================= */

  const animatedItems = document.querySelectorAll(
    ".shop_feature, " +
      ".ice_category, " +
      ".shop_omamori_feature, " +
      ".game_card, " +
      ".drink_card",
  );

  if (animatedItems.length > 0) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    animatedItems.forEach((item) => {
      observer.observe(item);
    });
  }

  /* =======================================================
  IMAGE FADE IN
  ======================================================= */

  const images = document.querySelectorAll(".shop_page img");

  images.forEach((image) => {
    /* すでに読み込み済みの場合 */
    if (image.complete) {
      image.classList.add("image-loaded");
      return;
    }

    image.addEventListener(
      "load",
      () => {
        image.classList.add("image-loaded");
      },
      {
        once: true,
      },
    );

    image.addEventListener(
      "error",
      () => {
        image.classList.add("image-error");
      },
      {
        once: true,
      },
    );
  });

  /* =======================================================
  ICE CARD HOVER
  ======================================================= */

  const iceCards = document.querySelectorAll(".ice_card");

  iceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("is-hover");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-hover");
    });
  });

  /* =======================================================
  ICE CATEGORY NUMBER
  ======================================================= */

  /*
    アイスカテゴリーごとの種類数を自動確認。

    HTML側の
    <span>10 FLAVORS</span>

    などの表示と、実際のカード数が違っていた場合に
    consoleへ警告を出します。
  */

  const iceCategories = document.querySelectorAll(".ice_category");

  iceCategories.forEach((category) => {
    const cards = category.querySelectorAll(".ice_card");

    const countElement = category.querySelector(
      ".ice_category_heading h3 span",
    );

    if (!countElement) {
      return;
    }

    const match = countElement.textContent.match(/\d+/);

    if (!match) {
      return;
    }

    const expectedCount = Number(match[0]);
    const actualCount = cards.length;

    if (expectedCount !== actualCount) {
      console.warn("アイスの種類数が一致していません。", {
        category: category,
        expected: expectedCount,
        actual: actualCount,
      });
    }
  });

  /* =======================================================
  ICE TOTAL COUNT
  ======================================================= */

  const totalIceCards = document.querySelectorAll(".ice_card").length;

  const iceTotalElement = document.querySelector(".ice_footer > p:first-child");

  if (iceTotalElement && totalIceCards > 0) {
    /*
      大浴場限定は .ice_card ではなく
      .ice_special なので別途1種類として加算
    */

    const publicBathIce = document.querySelector(".ice_special");

    let totalCount = totalIceCards;

    if (publicBathIce) {
      totalCount += 1;
    }

    iceTotalElement.textContent = `全${totalCount}種`;
  }

  /* =======================================================
  SMOOTH SCROLL
  ======================================================= */

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* =======================================================
  PAGE READY
  ======================================================= */

  document.body.classList.add("shop-page-ready");
});
