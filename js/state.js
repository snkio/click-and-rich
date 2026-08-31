export function saveGame() {
  localStorage.setItem("gameProgress", JSON.stringify(game));
  localStorage.setItem("shopProgress", JSON.stringify(shopItems));
}

export const getSaved = JSON.parse(localStorage.getItem("gameProgress"));
const getSavedShop = JSON.parse(localStorage.getItem("shopProgress"));

export const game = getSaved || {
  money: 0,
  totalMoney: 0,
  clickPower: 1,
  autoclicker: 0,
  // level: 1,
};

export let shopItems = getSavedShop || [
  {
    id: "buy-click",
    desc: "Сила клика",
    cost: 15,
    power: 1,
    count: 0,
    type: "click",
  },
  {
    id: "buy-multiclick",
    desc: "Мульти-клик",
    cost: 200,
    power: 5,
    count: 0,
    type: "click",
  },
  {
    id: "buy-autoclick",
    desc: "Автокликер",
    cost: 100,
    power: 1,
    count: 0,
  },
  {
    id: "buy-deposit",
    desc: "Вклад",
    cost: 300,
    power: 10,
    count: 0,
  },
];

export function updateShopItems(newShop) {
  shopItems = newShop;
}

export function earnByClick(gameObj) {
  gameObj.money += gameObj.clickPower;
  gameObj.totalMoney += gameObj.clickPower;
}

export function earnPassive(gameObj) {
  gameObj.money += gameObj.autoclicker;
  gameObj.totalMoney += gameObj.autoclicker;
}
