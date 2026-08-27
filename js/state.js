export function saveGame() {
  localStorage.setItem("gameProgress", JSON.stringify(game));
  localStorage.setItem("shopProgress", JSON.stringify(shopItems));
}

export const getSaved = JSON.parse(localStorage.getItem("gameProgress"));
const getSavedShop = JSON.parse(localStorage.getItem("shopProgress"));

export const game = getSaved || {
  money: 0,
  clickPower: 1,
  autoclicker: 0,
};

export let shopItems = getSavedShop || [
  {
    id: "buy-click",
    desc: "Прокачка клика",
    cost: 15,
    power: 1,
    count: 0,
  },
  {
    id: "buy-autoclick",
    desc: "Автокликер",
    cost: 100,
    power: 1,
    count: 0,
  },
];

export function updateShopItems(newShop) {
  shopItems = newShop;
}
