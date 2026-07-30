"use strict";

/*==========================
Fade In
==========================*/

const blocks = document.querySelectorAll(".time_block");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

blocks.forEach((block) => {
  observer.observe(block);
});

/*==========================
Background
==========================*/

const body = document.body;

/*
時間帯クラス削除
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
時間帯変更
*/

const bgObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const theme = entry.target.dataset.theme;

      // 既存時間クラス削除

      resetTimeBackground();

      // 新しい時間クラス追加

      body.classList.add("time-" + theme);
    });
  },
  {
    threshold: 0.55,
  },
);

blocks.forEach((block) => {
  bgObserver.observe(block);
});

/*
タイムライン外へ出たら
共通背景へ戻す
*/

const timeline = document.querySelector(".timeline");

const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        resetTimeBackground();
      }
    });
  },
  {
    threshold: 0.1,
  },
);

if (timeline) {
  timelineObserver.observe(timeline);
}

/*==========================
Current Time
==========================*/

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

/*==========================
Progress
==========================*/

const progress = document.querySelector(".timeline_progress");

window.addEventListener("scroll", () => {
  if (!progress) return;

  const timeline = document.querySelector(".timeline");

  if (!timeline) return;

  const rect = timeline.getBoundingClientRect();

  const total = timeline.offsetHeight;

  const visible = Math.min(Math.max(-rect.top, 0), total);

  progress.style.height = visible + "px";
});

/*==========================
Parallax
==========================*/

const mv = document.querySelector(".stay_mv");

window.addEventListener("scroll", () => {
  if (!mv) return;

  const y = window.scrollY;

  mv.style.backgroundPositionY = `${y * 0.35}px`;
});
