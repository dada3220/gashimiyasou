"use strict";

/*=========================================
Lightbox
=========================================*/

lightbox.option({
  resizeDuration: 200,

  wrapAround: true,

  fadeDuration: 200,

  imageFadeDuration: 200,

  disableScrolling: true,

  albumLabel: "%1 / %2",
});

/*=========================================
フェードアップ
=========================================*/

const fadeItems = document.querySelectorAll(
  ".activity_main, .activity_child, .activity_model",
);

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fadeUp");
        requestAnimationFrame(() => {
          entry.target.classList.add("show");
        });
      }
    });
  },

  {
    threshold: 0.15,
  },
);

fadeItems.forEach((item) => {
  fadeObserver.observe(item);
});

/*=========================================
現在地ナビ
=========================================*/

const sections = document.querySelectorAll(".activity_area");

const navLinks = document.querySelectorAll(".activity_nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 220;

    const height = section.offsetHeight;

    if (pageYOffset >= top) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/*=========================================
スムーススクロール
=========================================*/

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const id = link.getAttribute("href");

    const target = document.querySelector(id);

    window.scrollTo({
      top: target.offsetTop - 150,

      behavior: "smooth",
    });
  });
});
