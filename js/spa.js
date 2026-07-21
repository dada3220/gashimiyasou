"use strict";

/*==================================
ヘッダー
==================================*/

fetch("parts/header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("header-area").innerHTML = data;

    if (typeof initMenu === "function") {
      initMenu();
    }
  });

/*==================================
フッター
==================================*/

fetch("parts/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer-area").innerHTML = data;
  });

/*==================================
Lightbox
==================================*/

lightbox.option({
  resizeDuration: 200,
  wrapAround: true,
  fadeDuration: 300,
  imageFadeDuration: 300,
  disableScrolling: true,
  albumLabel: "%1 / %2",
});

/*==================================
スクロールフェード
==================================*/

const fadeTargets = document.querySelectorAll(
  ".spa_select, .private_area, .stamp",
);

function fadeAnime() {
  const windowHeight = window.innerHeight;

  fadeTargets.forEach((target) => {
    const top = target.getBoundingClientRect().top;

    if (top < windowHeight - 100) {
      target.classList.add("fadeUp");
    }
  });
}

window.addEventListener("scroll", fadeAnime);
window.addEventListener("load", fadeAnime);

/*==================================
選択状態
==================================*/

function changeActive(selector, element) {
  document.querySelectorAll(selector).forEach((item) => {
    item.classList.remove("active");
  });

  element.classList.add("active");
}
/*==================================
大浴場データ
==================================*/

const publicSpaData = {
  ozakura: {
    id: "ozakura",

    name: "大桜の湯",

    main: "images/spa_main1.png",

    description:
      "桜を望む露天風呂と開放感あふれる内湯を備えた大浴場です。四季折々の景色とともに、自家源泉の豊富な湯量をご堪能ください。",

    spec: {
      泉質: "単純温泉",
      設備: "露天風呂・内湯・サウナ・水風呂",
      利用時間: "15:00〜翌2:00 / 5:00〜10:00",
    },

    gallery: [
      "images/spa_sub01.png",
      "images/spa_sub02.png",
      "images/spa_sub03.png",
      "images/spa_sub04.png",
    ],
  },

  otaki: {
    id: "otaki",

    name: "大滝の湯",

    main: "images/spa_main2.png",

    description:
      "滝のせせらぎを眺めながらゆったりと浸かれる大浴場です。自然に囲まれた開放的な露天風呂と広々とした内湯で、心も身体も癒されます。",

    spec: {
      泉質: "単純温泉",
      設備: "露天風呂・内湯・サウナ・水風呂",
      利用時間: "15:00〜翌2:00 / 5:00〜10:00",
    },

    gallery: [
      "images/spa_sub05.png",
      "images/spa_sub06.png",
      "images/spa_sub07.png",
      "images/spa_sub08.png",
    ],
  },
};

/*==================================
貸切風呂（内風呂）
==================================*/

const privateIndoorData = {
  kohaku: {
    id: "kohaku",
    name: "琥珀の湯",
    spring: "塩化物泉",
    place: "本館1階",
    effect: "冷え性・疲労回復",
    description: "身体の芯から温まる、やさしい塩化物泉です。",
    gallery: ["images/spa01.png", "images/spa01_2.png", "images/spa01_3.png"],
  },

  shion: {
    id: "shion",
    name: "紫苑の湯",
    spring: "炭酸水素塩泉",
    place: "本館2階",
    effect: "美肌・保湿",
    description: "肌をしっとり包み込む美肌の湯です。",
    gallery: ["images/spa02.png", "images/spa02_2.png", "images/spa02_3.png"],
  },

  ruri: {
    id: "ruri",
    name: "瑠璃の湯",
    spring: "硫酸塩泉",
    place: "本館3階",
    effect: "切り傷・やけど",
    description: "青を基調とした落ち着いた雰囲気の貸切風呂です。",
    gallery: ["images/spa03.png", "images/spa03_2.png", "images/spa03_3.png"],
  },

  bokusumi: {
    id: "bokusumi",
    name: "黒墨の湯",
    spring: "モール泉",
    place: "本館1階",
    effect: "保湿・疲労回復",
    description: "植物由来の成分を豊富に含む天然モール泉です。",
    gallery: ["images/spa04.png", "images/spa04_2.png", "images/spa04_3.png"],
  },

  moegi: {
    id: "moegi",
    name: "萌葱の湯",
    spring: "放射能泉",
    place: "屋上",
    effect: "神経痛・関節痛",
    description: "屋上で静かな時間を楽しめる貸切風呂です。",
    gallery: ["images/spa05.png", "images/spa05_2.png", "images/spa05_3.png"],
  },

  asagi: {
    id: "asagi",
    name: "浅葱の湯",
    spring: "二酸化炭素泉",
    place: "屋上",
    effect: "血行促進",
    description: "やさしい湯あたりで身体を温める人気のお風呂です。",
    gallery: ["images/spa06.png", "images/spa06_2.png", "images/spa06_3.png"],
  },
};

/*==================================
貸切風呂（露天）
==================================*/

const privateOutdoorData = {
  bengara: {
    id: "bengara",
    name: "紅殻の湯",
    spring: "含鉄泉",
    place: "日本庭園",
    effect: "冷え性・貧血",
    description: "赤褐色の湯が特徴の開放感あふれる露天風呂です。",
    gallery: ["images/spa07.png", "images/spa07_2.png", "images/spa07_3.png"],
  },

  nyuhaku: {
    id: "nyuhaku",
    name: "乳白の湯",
    spring: "硫黄泉",
    place: "日本庭園",
    effect: "皮膚病・疲労回復",
    description: "乳白色の湯を楽しめる人気の露天風呂です。",
    gallery: ["images/spa08.png", "images/spa08_2.png", "images/spa08_3.png"],
  },

  hisui: {
    id: "hisui",
    name: "翡翠の湯",
    spring: "酸性泉",
    place: "日本庭園",
    effect: "皮膚病",
    description: "庭園の景色を眺めながらゆったり過ごせます。",
    gallery: ["images/spa09.png", "images/spa09_2.png", "images/spa09_3.png"],
  },

  kihada: {
    id: "kihada",
    name: "黄蘗の湯",
    spring: "含アルミニウム泉",
    place: "日本庭園",
    effect: "皮膚病",
    description: "木々に囲まれた静かな露天風呂です。",
    gallery: ["images/spa10.png", "images/spa10_2.png", "images/spa10_3.png"],
  },

  kuchiba: {
    id: "kuchiba",
    name: "朽葉の湯",
    spring: "アルカリ性単純温泉",
    place: "日本庭園",
    effect: "美肌",
    description: "柔らかな湯ざわりが特徴の露天風呂です。",
    gallery: ["images/spa11.png", "images/spa11_2.png", "images/spa11_3.png"],
  },

  hakudei: {
    id: "hakudei",
    name: "白泥の湯",
    spring: "酸性単純温泉",
    place: "日本庭園",
    effect: "疲労回復",
    description: "自然に囲まれた静かな貸切露天風呂です。",
    gallery: ["images/spa12.png", "images/spa12_2.png", "images/spa12_3.png"],
  },
};
/*==================================
大浴場 描画
==================================*/

function renderPublicSpa(id) {
  const spa = publicSpaData[id];

  if (!spa) return;

  const gallery = spa.gallery
    .map(
      (img) => `
      <a href="${img}" data-lightbox="${spa.id}">
        <img src="${img}" alt="${spa.name}">
      </a>
    `,
    )
    .join("");

  const spec = Object.entries(spa.spec)
    .map(
      ([key, value]) => `
      <tr>
        <th>${key}</th>
        <td>${value}</td>
      </tr>
    `,
    )
    .join("");

  document.getElementById("publicSpaContent").innerHTML = `
    <div class="public_detail">

      <div class="public_image">
        <img src="${spa.main}" alt="${spa.name}">
      </div>

      <div class="public_info">

        <h2>${spa.name}</h2>

        <p>${spa.description}</p>

        <div class="public_spec">
          <table>
            ${spec}
          </table>
        </div>

      </div>

    </div>

    <div class="public_gallery">
      ${gallery}
    </div>
  `;

  refreshLightbox();
}

/*==================================
貸切風呂 共通描画
==================================*/

/*==================================
貸切風呂 共通描画
==================================*/

function renderPrivateSpa(data, target) {
  if (!data) return;

  const gallery = data.gallery
    .map(
      (img) => `
      <a href="${img}" data-lightbox="${data.id}">
        <img src="${img}" alt="${data.name}">
      </a>
    `,
    )
    .join("");

  document.getElementById(target).innerHTML = `
    <div class="private_detail">

      <div class="private_image">
        <img src="${data.gallery[0]}" alt="${data.name}">
      </div>

      <div class="private_info">

        <span class="private_badge">
          ${data.spring}
        </span>

        <h2>${data.name}</h2>

        <p>${data.description}</p>

        <div class="private_spec">

          <table>

            <tr>
              <th>泉質</th>
              <td>${data.spring}</td>
            </tr>

            <tr>
              <th>効能</th>
              <td>${data.effect}</td>
            </tr>

            <tr>
              <th>場所</th>
              <td>${data.place}</td>
            </tr>

          </table>

        </div>

      </div>

    </div>

    <div class="private_gallery">
      ${gallery}
    </div>
  `;

  refreshLightbox();
}

/*==================================
貸切風呂（内湯）
==================================*/

function renderPrivateIndoor(id) {
  renderPrivateSpa(privateIndoorData[id], "privateIndoorContent");
}

/*==================================
貸切風呂（露天）
==================================*/

function renderPrivateOutdoor(id) {
  renderPrivateSpa(privateOutdoorData[id], "privateOutdoorContent");
}
/*==================================
大浴場クリック
==================================*/

document.querySelectorAll(".spa_card").forEach((card) => {
  card.addEventListener("click", function () {
    const id = this.dataset.spa;

    changeActive(".spa_card", this);

    renderPublicSpa(id);
  });
});

/*==================================
貸切風呂（内風呂）クリック
==================================*/

document.querySelectorAll(".private_thumb[data-private]").forEach((thumb) => {
  thumb.addEventListener("click", function () {
    const id = this.dataset.private;

    changeActive(".private_thumb[data-private]", this);

    renderPrivateIndoor(id);
  });
});

/*==================================
貸切風呂（露天）クリック
==================================*/

document
  .querySelectorAll(".private_thumb[data-private-out]")
  .forEach((thumb) => {
    thumb.addEventListener("click", function () {
      const id = this.dataset.privateOut;

      changeActive(".private_thumb[data-private-out]", this);

      renderPrivateOutdoor(id);
    });
  });

/*==================================
初期表示
==================================*/

renderPublicSpa("ozakura");

renderPrivateIndoor("kohaku");

renderPrivateOutdoor("bengara");
/*==================================
Lightbox再設定
==================================*/

function refreshLightbox() {
  if (typeof lightbox === "undefined") return;

  lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
    fadeDuration: 300,
    imageFadeDuration: 300,
    disableScrolling: true,
    albumLabel: "%1 / %2",
  });
}
