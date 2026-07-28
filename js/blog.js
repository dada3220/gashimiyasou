"use strict";

const blogList = document.getElementById("blogList");

fetch("articles/index.json")
  .then((res) => res.json())
  .then((data) => {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));

    data.forEach((article) => {
      blogList.innerHTML += `

        <article class="blog_card">

            <a href="article.html?id=${article.id}">

                <img src="${article.thumbnail}" alt="">

                <div class="blog_content">

                    <p class="date">${article.date}</p>

                    <span class="category">${article.category}</span>

                    <h2>${article.title}</h2>

                </div>

            </a>

        </article>

      `;
    });
  });
