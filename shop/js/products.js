"use strict";

/* =========================================================
   がしみや荘 ONLINE SHOP
   products.js

   商品データ
========================================================= */

const products = [
  /* =======================================================
     ICE
  ======================================================== */

  {
    id: "ice-001",
    name: "湯あがりミルク",
    category: "ice",
    categoryName: "ORIGINAL ICE",
    price: 450,
    image: "images/ice/milk.jpg",
    description:
      "湯あがりの身体にやさしく寄り添う、濃厚でまろやかなミルクアイス。",
    badge: "RECOMMEND",
    recommend: true,
  },

  {
    id: "ice-002",
    name: "湯あがりミックスオレ",
    category: "ice",
    categoryName: "ORIGINAL ICE",
    price: 450,
    image: "images/ice/mix_ore.jpg",
    description:
      "どこか懐かしい味わいのミックスオレ。湯あがりにぴったりの一品です。",
    badge: "RECOMMEND",
    recommend: true,
  },

  {
    id: "ice-003",
    name: "湯煙バニラ",
    category: "ice",
    categoryName: "ORIGINAL ICE",
    price: 450,
    image: "images/ice/vanilla.jpg",
    description: "上品な香りとコクを楽しむ、がしみや荘定番のバニラアイス。",
    badge: "",
    recommend: true,
  },

  {
    id: "ice-004",
    name: "大宮大桜さくら",
    category: "ice",
    categoryName: "ORIGINAL ICE",
    price: 480,
    image: "images/ice/sakura.jpg",
    description: "大宮大桜を思わせる、淡く華やかな桜風味のアイス。",
    badge: "",
    recommend: false,
  },

  {
    id: "ice-005",
    name: "湯畑抹茶",
    category: "ice",
    categoryName: "ORIGINAL ICE",
    price: 480,
    image: "images/ice/matcha.jpg",
    description: "香り高い抹茶を使用した、ほろ苦く上品な味わい。",
    badge: "",
    recommend: false,
  },

  {
    id: "ice-006",
    name: "温泉卵プリン",
    category: "ice",
    categoryName: "ORIGINAL ICE",
    price: 500,
    image: "images/ice/pudding.jpg",
    description: "温泉卵をイメージした、とろりと濃厚なプリン風アイス。",
    badge: "",
    recommend: false,
  },

  /* =======================================================
     FOOD
  ======================================================== */

  {
    id: "food-001",
    name: "がしみや荘 特製温泉饅頭",
    category: "food",
    categoryName: "FOOD",
    price: 1200,
    image: "images/food/manju.jpg",
    description: "旅のお土産として親しまれる、がしみや荘特製の温泉饅頭。",
    badge: "BEST SELLER",
    recommend: true,
  },

  {
    id: "food-002",
    name: "がしみや荘 特製どてに",
    category: "food",
    categoryName: "FOOD",
    price: 1800,
    image: "images/food/doteni.jpg",
    description: "館内の「どてに」で味わえる、じっくり煮込んだ特製どてに。",
    badge: "",
    recommend: true,
  },

  {
    id: "food-003",
    name: "季節の山の恵み詰め合わせ",
    category: "food",
    categoryName: "FOOD",
    price: 2400,
    image: "images/food/seasonal_food.jpg",
    description: "季節ごとに異なる山の恵みを楽しめる詰め合わせ。",
    badge: "SEASONAL",
    recommend: false,
  },

  /* =======================================================
     GOODS
  ======================================================== */

  {
    id: "goods-001",
    name: "湯巡り手ぬぐい",
    category: "goods",
    categoryName: "GOODS",
    price: 1500,
    image: "images/goods/tenugui.jpg",
    description: "12の貸切風呂を巡る旅のお供に。がしみや荘オリジナル手ぬぐい。",
    badge: "ORIGINAL",
    recommend: true,
  },

  {
    id: "goods-002",
    name: "がしみや荘 オリジナル巾着",
    category: "goods",
    categoryName: "GOODS",
    price: 1800,
    image: "images/goods/kinchaku.jpg",
    description: "館内での小物入れとしても使える、オリジナル巾着。",
    badge: "",
    recommend: false,
  },

  {
    id: "goods-003",
    name: "湯巡り記念帖",
    category: "goods",
    categoryName: "GOODS",
    price: 1200,
    image: "images/goods/ki-nencho.jpg",
    description: "12の貸切風呂を巡った記録を残せるオリジナル記念帖。",
    badge: "",
    recommend: false,
  },

  {
    id: "goods-004",
    name: "がしみや荘 香彩堂",
    category: "goods",
    categoryName: "GOODS",
    price: 2200,
    image: "images/goods/incense.jpg",
    description: "館内の香りをイメージした、オリジナルのお香。",
    badge: "",
    recommend: false,
  },

  /* =======================================================
     OMAMORI
  ======================================================== */

  {
    id: "omamori-001",
    name: "湯運守",
    category: "omamori",
    categoryName: "ONSEN SHRINE",
    price: 800,
    image: "images/omamori/yuun-mamori.jpg",
    description: "良き湯とのご縁、良き旅とのご縁を願う温泉神社のお守り。",
    badge: "POPULAR",
    recommend: true,
  },

  {
    id: "omamori-002",
    name: "湯健守",
    category: "omamori",
    categoryName: "ONSEN SHRINE",
    price: 800,
    image: "images/omamori/yuken-mamori.jpg",
    description: "健やかな日々と、心身の癒しを願うお守り。",
    badge: "",
    recommend: false,
  },

  {
    id: "omamori-003",
    name: "湯煙守",
    category: "omamori",
    categoryName: "ONSEN SHRINE",
    price: 800,
    image: "images/omamori/yukemuri-mamori.jpg",
    description: "温泉の湯煙に願いを託す、がしみや荘オリジナルのお守り。",
    badge: "",
    recommend: false,
  },

  {
    id: "omamori-004",
    name: "湯巡守",
    category: "omamori",
    categoryName: "ONSEN SHRINE",
    price: 800,
    image: "images/omamori/yumeguri-mamori.jpg",
    description: "旅の安全と、これからの湯巡りを願うお守り。",
    badge: "",
    recommend: false,
  },

  /* =======================================================
     SEASONAL
  ======================================================== */

  {
    id: "seasonal-001",
    name: "春限定 桜もちアイス",
    category: "seasonal",
    categoryName: "SEASONAL",
    price: 500,
    image: "images/seasonal/sakura-mochi.jpg",
    description: "春だけの限定商品。桜もちをイメージした季節のアイス。",
    badge: "SPRING",
    recommend: false,
  },

  {
    id: "seasonal-002",
    name: "夏限定 湯あがりラムネ",
    category: "seasonal",
    categoryName: "SEASONAL",
    price: 380,
    image: "images/seasonal/ramune.jpg",
    description: "夏の湯あがりに楽しみたい、爽やかなラムネ。",
    badge: "SUMMER",
    recommend: false,
  },

  {
    id: "seasonal-003",
    name: "秋限定 栗アイス",
    category: "seasonal",
    categoryName: "SEASONAL",
    price: 520,
    image: "images/seasonal/chestnut.jpg",
    description: "秋の味覚、栗を贅沢に使用した期間限定アイス。",
    badge: "AUTUMN",
    recommend: false,
  },

  {
    id: "seasonal-004",
    name: "冬限定 焼き餅セット",
    category: "seasonal",
    categoryName: "SEASONAL",
    price: 1600,
    image: "images/seasonal/mochi.jpg",
    description: "冬の旅のお供に。香ばしく焼いて楽しむ季節限定のお餅。",
    badge: "WINTER",
    recommend: false,
  },
];

/* =========================================================
   CATEGORY NAME
========================================================= */

const categoryNames = {
  all: "すべての商品",
  ice: "オリジナルアイス",
  food: "食べもの",
  goods: "旅の品",
  omamori: "温泉神社",
  seasonal: "季節限定",
};
