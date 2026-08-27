"use strict";

/*==================================
  Stay Page
==================================*/

/*==================================
  Elements
==================================*/

const body = document.body;
const timeline = document.querySelector(".timeline");
const progress = document.querySelector(".timeline_progress");
const mv = document.querySelector(".stay_mv");

const blocks = document.querySelectorAll(".time_block");

/*==================================
  Time Background
==================================*/

/*
  時間帯クラスをすべて削除
*/

function resetTimeBackground() {
  body.classList.remove(
    "time-day",
    "time-evening",
    "time-night",
    "time-midnight",
    "time-morning",
  );
}

/*
  時間帯クラスを設定
*/

function setTimeBackground(theme) {
  resetTimeBackground();

  if (!theme) return;

  body.classList.add(`time-${theme}`);
}

/*==================================
  Fade In
==================================*/

/*
  タイムラインカードを表示
*/

if (blocks.length > 0) {
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");

          // 一度表示したら監視を終了
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  blocks.forEach((block) => {
    fadeObserver.observe(block);
  });
}

/*==================================
  Background Observer
==================================*/

/*
  現在表示されている時間帯に合わせて
  bodyの背景を変更
*/

if (blocks.length > 0) {
  const bgObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const theme = entry.target.dataset.theme;

        setTimeBackground(theme);
      });
    },
    {
      threshold: 0.55,
    },
  );

  blocks.forEach((block) => {
    bgObserver.observe(block);
  });
}

/*==================================
  Timeline Background Reset
==================================*/

/*
  タイムラインから離れたら
  通常の背景へ戻す
*/

if (timeline) {
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          resetTimeBackground();
        }
      });
    },
    {
      threshold: 0.05,
    },
  );

  timelineObserver.observe(timeline);
}

/*==================================
  Current Time
==================================*/

/*
  画面中央付近にある時間を強調
*/

if (blocks.length > 0) {
  const timeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const time = entry.target.querySelector(".time");

        if (!time) return;

        if (entry.isIntersecting) {
          time.classList.add("active");
        } else {
          time.classList.remove("active");
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  blocks.forEach((block) => {
    timeObserver.observe(block);
  });
}

/*==================================
  Timeline Progress
==================================*/

function updateTimelineProgress() {
  if (!timeline || !progress) return;

  const rect = timeline.getBoundingClientRect();

  const total = timeline.offsetHeight;

  /*
    タイムライン上端が
    画面上端よりどれだけ上へ移動したか
  */

  const passed = Math.min(Math.max(-rect.top, 0), total);

  progress.style.height = `${passed}px`;
}

/*==================================
  MV Parallax
==================================*/

let ticking = false;

function updateParallax() {
  if (!mv) return;

  const y = window.scrollY;

  mv.style.backgroundPositionY = `${y * 0.35}px`;

  ticking = false;
}

/*==================================
  Scroll
==================================*/

window.addEventListener(
  "scroll",
  () => {
    /*
      1回のスクロールイベントで
      ProgressとParallaxをまとめて更新
    */

    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateTimelineProgress();
        updateParallax();
      });

      ticking = true;
    }
  },
  {
    passive: true,
  },
);

/*==================================
  Initial
==================================*/

/*
  ページ読み込み時にも
  Progressを正しく計算
*/

updateTimelineProgress();
updateParallax();
