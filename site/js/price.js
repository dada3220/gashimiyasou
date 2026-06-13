"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab_btn");
  const contents = document.querySelectorAll(".tab_content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((c) => c.classList.remove("active"));

      tab.classList.add("active");

      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });
});
