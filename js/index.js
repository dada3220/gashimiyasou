"use strict";

$(function () {
  /* ==================================
     FlexSlider
  ================================== */

  $("#fs").flexslider({
    animation: "fade",

    slideshow: true,

    slideshowSpeed: 6000,

    animationSpeed: 1500,

    controlNav: true,

    directionNav: false,

    pauseOnHover: false,

    pauseOnAction: false,

    touch: true,

    smoothHeight: false,
  });
});

/* ==================================
     お知らせ読み込み
  ================================== */

fetch("data/news.json")
  .then((response) => response.json())
  .then((newsData) => {
    const newsList = document.getElementById("topNewsList");

    if (!newsList) {
      return;
    }

    // 最新3件だけ表示
    const latestNews = newsData.slice(0, 3);

    latestNews.forEach((news) => {
      const article = document.createElement("a");

      article.className = "top_news_item";
      article.href = "news.html";

      article.innerHTML = `

        <time class="top_news_date">
          ${news.date}
        </time>

        <div class="top_news_info">

          <h3 class="top_news_title">
            ${news.title}
          </h3>

          <p class="top_news_content">
            ${news.content}
          </p>

        </div>

        <span class="top_news_arrow">
          →
        </span>

      `;

      newsList.appendChild(article);
    });
  })
  .catch((error) => {
    console.error("お知らせの読み込みに失敗しました:", error);
  });
