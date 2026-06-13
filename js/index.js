"use strict";

fetch("data/news.json")
  .then((response) => response.json())
  .then((news) => {
    const latest = news[0];

    document.getElementById("newsDate").textContent = latest.date;

    document.getElementById("newsTitle").textContent = latest.title;
  });
