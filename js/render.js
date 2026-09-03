import { shopItems, game } from "./state.js";

const moneyCounter = document.querySelector("#moneyCounter");
const tapCounter = document.querySelector("#tapCounter");
const persecCounter = document.querySelector("#persecCounter");

export function refreshUI() {
  tapCounter.textContent = `+${game.clickPower}`;
  persecCounter.textContent = `+${game.autoclicker}`;
  moneyCounter.textContent = clearNum(game.money);
  const btn = document.querySelectorAll(".shop__item-btn");

  btn.forEach((elem) => {
    const getDataId = elem.dataset.id;
    const getItemCost = shopItems.find((item) => item.id === getDataId);

    if (getItemCost) {
      const getSpan = elem.querySelector("span");
      getSpan.textContent = getItemCost.cost;
    }
  });
}

function clearNum(x) {
  if (x < 1000000) {
    console.log("Меньше");
    return "$" + x.toLocaleString("ru-RU");
  } else if (x > 1000000) {
    let result = x / 1000000;
    console.log("Больше");
    return "$" + result.toFixed(2) + "M";
  }
}

export function renderShop() {
  const shopHTML = shopItems
    .map((e) => {
      const nextPower = Math.round(e.power * Math.pow(1.15, e.count));
      const result = clearNum(e.cost);

      return `
    <li class="shop__item">
      <button class="shop__button" data-id="${e.id}">
          <div class="shop__info">
            <img src="${e.PATH}" alt="" aria-hidden="true">
            <p>${e.desc}</p>
          </div>
          <span class="shop__lvl">${e.count}</span>   
          <span class="shop__price hidden">${result}</span>     
      </button>
      <div class="shop__popup hidden">
        <div class="shop__info">
          <img src="${e.PATH}" alt="" aria-hidden="true">
          <p>${e.desc}</p>
        <div>
        <span>&dollar;${e.cost}</span> 
      </div>  
    </li>
`;
    })
    .join("");

  shop.innerHTML = shopHTML;
}
