"use strict";

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    const headerOffset = 110;

    const elementPosition = target.getBoundingClientRect().top;

    const offsetPosition = window.pageYOffset + elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  });
});
