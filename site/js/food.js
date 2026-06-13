"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initSeasonMenu();

  initScrollFade();

  initBreakfastSlider();
});

// =========================
// 季節メニュー
// =========================

function initSeasonMenu() {
  const seasonData = {
    spring: {
      title: "春のお料理",
      image: "images/food01.png",
      menu: "images/menu01.png",
    },

    summer: {
      title: "夏のお料理",
      image: "images/food02.png",
      menu: "images/menu02.png",
    },

    autumn: {
      title: "秋のお料理",
      image: "images/food03.png",
      menu: "images/menu03.png",
    },

    winter: {
      title: "冬のお料理",
      image: "images/food04.png",
      menu: "images/menu04.png",
    },
  };

  // =========================
  // 季節判定
  // =========================

  function getCurrentSeason() {
    const month = new Date().getMonth() + 1;

    if (month >= 3 && month <= 5) {
      return "spring";
    }

    if (month >= 6 && month <= 8) {
      return "summer";
    }

    if (month >= 9 && month <= 11) {
      return "autumn";
    }

    return "winter";
  }

  // =========================
  // 季節表示
  // =========================

  function showSeason(season) {
    const content = document.getElementById("season-content");

    // ボタンactive切替

    const buttons = document.querySelectorAll(".season_buttons button");

    buttons.forEach((button) => {
      button.classList.remove("active");

      if (button.dataset.season === season) {
        button.classList.add("active");
      }
    });

    // フェードアウト

    content.classList.add("hide");

    setTimeout(() => {
      const data = seasonData[season];

      content.innerHTML = `
        <section class="season_food fade scroll-fade">

          <h2>${data.title}</h2>

          <!-- 料理画像 -->
          <div class="food_image">

            <a
              href="${data.image}"
              data-lightbox="food"
              data-title="${data.title}"
            >

              <img
                src="${data.image}"
                alt="${data.title}"
              >

            </a>

          </div>

          <!-- お品書き -->
          <div class="menu_image">

            <a
              href="${data.menu}"
              data-lightbox="menu"
              data-title="${data.title} お品書き"
            >

              <img
                src="${data.menu}"
                alt="${data.title} お品書き"
              >

            </a>

          </div>

        </section>
      `;

      content.classList.remove("hide");

      // スクロール判定

      scrollFade();
    }, 200);
  }

  // =========================
  // 初期表示
  // =========================

  const currentSeason = getCurrentSeason();

  showSeason(currentSeason);

  // =========================
  // ボタン切替
  // =========================

  const buttons = document.querySelectorAll(".season_buttons button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const season = button.dataset.season;

      showSeason(season);
    });
  });
}

// =========================
// スクロールフェード
// =========================

function initScrollFade() {
  window.addEventListener("scroll", scrollFade);

  scrollFade();
}

function scrollFade() {
  const targets = document.querySelectorAll(".scroll-fade");

  targets.forEach((target) => {
    const rect = target.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100) {
      target.classList.add("active");
    }
  });
}

// =========================
// 朝食スライダー
// =========================

function initBreakfastSlider() {
  const track = document.querySelector(".slider_track");

  // 要素がない場合は終了

  if (!track) return;

  const slides = document.querySelectorAll(".slider_track a");

  const nextBtn = document.querySelector(".next");

  const prevBtn = document.querySelector(".prev");

  const sliderText = document.getElementById("slider-text");

  let currentIndex = 0;

  // =========================
  // 次へ
  // =========================

  nextBtn.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }

    updateSlider();
  });

  // =========================
  // 前へ
  // =========================

  prevBtn.addEventListener("click", () => {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = slides.length - 1;
    }

    updateSlider();
  });

  // =========================
  // スライド更新
  // =========================

  function updateSlider() {
    // 画像移動

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // 説明文切替

    sliderText.classList.remove("show");

    setTimeout(() => {
      sliderText.textContent = captions[currentIndex];

      sliderText.classList.add("show");
    }, 200);
  }

  // 初期表示

  sliderText.classList.add("show");
}
