"use strict";

/* =========================
   要素取得
========================= */

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");

const roomSection = document.getElementById("roomSection");
const planSection = document.getElementById("planSection");
const infoSection = document.getElementById("infoSection");

const roomCards = document.querySelectorAll(".room_card");
const planButtons = document.querySelectorAll(".plan_btn");

const people = document.getElementById("people");
const totalPrice = document.getElementById("totalPrice");

const rateLabel = document.getElementById("rateLabel");

/* =========================
   料金表
========================= */

const prices = {
  weekday: {
    standard: {
      normal: 28000,
      stay: 23000,
    },

    deluxe: {
      normal: 35000,
      stay: 30000,
    },

    suite: {
      normal: 40000,
      stay: 35000,
    },
  },

  holiday: {
    standard: {
      normal: 33000,
      stay: 28000,
    },

    deluxe: {
      normal: 40000,
      stay: 35000,
    },

    suite: {
      normal: 45000,
      stay: 40000,
    },
  },
};

/* =========================
   状態管理
========================= */

let selectedRoom = "";
let selectedPrice = 0;

/* =========================
   初期日付設定
========================= */

window.addEventListener("DOMContentLoaded", () => {
  const today = new Date();

  const yyyy = today.getFullYear();

  const mm = String(today.getMonth() + 1).padStart(2, "0");

  const dd = String(today.getDate()).padStart(2, "0");

  checkin.value = `${yyyy}-${mm}-${dd}`;

  const nextDay = new Date(today);

  nextDay.setDate(nextDay.getDate() + 1);

  const yyyy2 = nextDay.getFullYear();

  const mm2 = String(nextDay.getMonth() + 1).padStart(2, "0");

  const dd2 = String(nextDay.getDate()).padStart(2, "0");

  checkout.value = `${yyyy2}-${mm2}-${dd2}`;
});

/* =========================
   休前日判定
========================= */

function isHolidayEve(dateString) {
  const date = new Date(dateString);

  const day = date.getDay();

  return day === 5 || day === 6;
}

/* =========================
   料金表示更新
========================= */

function updatePlanPrices() {
  if (!selectedRoom) return;

  const rateType = isHolidayEve(checkin.value) ? "holiday" : "weekday";

  rateLabel.textContent = rateType === "holiday" ? "休前日料金" : "平日料金";

  const normalBtn = document.querySelector('[data-plan="normal"]');

  const stayBtn = document.querySelector('[data-plan="stay"]');

  normalBtn.querySelector("span").textContent =
    prices[rateType][selectedRoom].normal.toLocaleString() + "円 / 室";

  stayBtn.querySelector("span").textContent =
    prices[rateType][selectedRoom].stay.toLocaleString() + "円 / 室";
}

/* =========================
   チェックイン変更
========================= */

checkin.addEventListener("change", () => {
  const nextDay = new Date(checkin.value);

  nextDay.setDate(nextDay.getDate() + 1);

  const yyyy = nextDay.getFullYear();

  const mm = String(nextDay.getMonth() + 1).padStart(2, "0");

  const dd = String(nextDay.getDate()).padStart(2, "0");

  checkout.value = `${yyyy}-${mm}-${dd}`;

  showSection(roomSection);
});

/* =========================
   客室選択
========================= */

roomCards.forEach((card) => {
  card.addEventListener("click", () => {
    roomCards.forEach((c) => c.classList.remove("active"));

    card.classList.add("active");

    selectedRoom = card.dataset.room;

    updatePeopleOptions();

    updatePlanPrices();

    showSection(planSection);
  });
});

/* =========================
   プラン選択
========================= */

planButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    planButtons.forEach((b) => b.classList.remove("active"));

    btn.classList.add("active");

    const rateType = isHolidayEve(checkin.value) ? "holiday" : "weekday";

    if (btn.dataset.plan === "normal") {
      selectedPrice = prices[rateType][selectedRoom].normal;
    } else {
      selectedPrice = prices[rateType][selectedRoom].stay;
    }

    calculatePrice();

    showSection(infoSection);
  });
});

/* =========================
   人数変更
========================= */

function updatePeopleOptions() {
  people.innerHTML = '<option value="">人数を選択してください</option>';

  let max = 2;

  if (selectedRoom === "deluxe" || selectedRoom === "suite") {
    max = 4;
  }

  for (let i = 1; i <= max; i++) {
    const option = document.createElement("option");

    option.value = i;
    option.textContent = i + "名";

    people.appendChild(option);
  }
}

/* =========================
   金額計算
========================= */

function calculatePrice() {
  const count = Number(people.value);

  const total = selectedPrice * count;

  totalPrice.textContent = total > 0 ? "¥" + total.toLocaleString() : "¥0";
}

people.addEventListener("change", calculatePrice);

/* =========================
   セクション表示
========================= */

function showSection(section) {
  const title = section.querySelector(".reserve_title");

  if (section.classList.contains("hidden")) {
    section.classList.remove("hidden");
  }

  setTimeout(() => {
    const headerOffset = 140;

    const position =
      title.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: position,

      behavior: "smooth",
    });
  }, 100);
}

/* =========================
   予約完了
========================= */

document.getElementById("reserveForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  let firstErrorElement = null;

  clearErrors();

  /* チェックイン */

  if (!checkin.value) {
    showError(checkin, "チェックイン日を選択してください");

    if (!firstErrorElement) {
      firstErrorElement = checkin;
    }

    isValid = false;
  }

  /* チェックアウト */

  if (!checkout.value) {
    showError(checkout, "チェックアウト日を選択してください");

    if (!firstErrorElement) {
      firstErrorElement = checkout;
    }

    isValid = false;
  }

  if (
    checkin.value &&
    checkout.value &&
    new Date(checkout.value) <= new Date(checkin.value)
  ) {
    showError(
      checkout,
      "チェックアウト日はチェックイン日より後の日付を選択してください",
    );

    if (!firstErrorElement) {
      firstErrorElement = checkout;
    }

    isValid = false;
  }

  /* 客室 */

  if (!selectedRoom) {
    alert("客室タイプを選択してください");

    isValid = false;
  }

  /* プラン */

  const selectedPlan = document.querySelector(".plan_btn.active");

  if (!selectedPlan) {
    alert("宿泊プランを選択してください");

    isValid = false;
  }

  /* 人数 */

  if (!people.value) {
    showError(people, "人数を選択してください");

    if (!firstErrorElement) {
      firstErrorElement = people;
    }

    isValid = false;
  }

  /* お名前 */

  const name = document.getElementById("name");

  if (name.value.trim() === "") {
    showError(name, "お名前を入力してください");

    if (!firstErrorElement) {
      firstErrorElement = name;
    }

    isValid = false;
  }

  /* ふりがな */

  const kana = document.getElementById("kana");

  if (kana.value.trim() === "") {
    showError(kana, "ふりがなを入力してください");

    if (!firstErrorElement) {
      firstErrorElement = kana;
    }

    isValid = false;
  } else if (!/^[ぁ-んー\s]+$/.test(kana.value.trim())) {
    showError(kana, "ふりがなはひらがなで入力してください");

    if (!firstErrorElement) {
      firstErrorElement = kana;
    }

    isValid = false;
  }

  /* 電話番号 */

  const phone = document.getElementById("phone");

  if (phone.value.trim() === "") {
    showError(phone, "電話番号を入力してください");

    if (!firstErrorElement) {
      firstErrorElement = phone;
    }

    isValid = false;
  } else if (!/^\d{10,11}$/.test(phone.value.trim())) {
    showError(phone, "電話番号はハイフンなし10～11桁で入力してください");

    if (!firstErrorElement) {
      firstErrorElement = phone;
    }

    isValid = false;
  }

  /* 合計金額 */

  if (selectedPrice === 0) {
    alert("宿泊プランを選択してください");

    isValid = false;
  }

  /* エラー時 */

  if (!isValid) {
    if (firstErrorElement) {
      const headerOffset = 140;

      const position =
        firstErrorElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerOffset;

      window.scrollTo({
        top: position,
        behavior: "smooth",
      });

      if (
        firstErrorElement instanceof HTMLInputElement ||
        firstErrorElement instanceof HTMLSelectElement ||
        firstErrorElement instanceof HTMLTextAreaElement
      ) {
        firstErrorElement.focus();
      }
    }

    return;
  }

  /* OK */

  document.getElementById("completeOverlay").classList.add("show");
});

function showError(input, message) {
  input.classList.add("input_error");

  const error = document.createElement("p");

  error.className = "error_message";

  error.textContent = message;

  input.parentNode.appendChild(error);
}

function clearErrors() {
  document
    .querySelectorAll(".error_message")
    .forEach((error) => error.remove());

  document.querySelectorAll(".input_error").forEach((input) => {
    input.classList.remove("input_error");
  });
}
