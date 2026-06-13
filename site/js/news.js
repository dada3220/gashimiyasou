"use strict";

fetch("data/news.json")
  .then((response) => response.json())
  .then((newsData) => {
    const newsList = document.getElementById("newsList");

    newsData.forEach((news) => {
      const article = document.createElement("div");

      article.className = "news_item";

      article.innerHTML = `

        <button class="news_header">

          <span class="news_date">
            ${news.date}
          </span>

          <span class="news_title">
            ${news.title}
          </span>

        </button>

        <div class="news_content">

          <p>
            ${news.content}
          </p>

        </div>

      `;

      newsList.appendChild(article);
    });

    initAccordion();
  });

function initAccordion() {
  const headers = document.querySelectorAll(".news_header");

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.parentElement;

      document.querySelectorAll(".news_item").forEach((news) => {
        if (news !== item) {
          news.classList.remove("active");
        }
      });

      item.classList.toggle("active");
    });
  });
}
