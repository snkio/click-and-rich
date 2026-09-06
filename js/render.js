import { shopItems, game } from "./state.js";

const moneyCounter = document.querySelector("#moneyCounter");
const tapCounter = document.querySelector("#tapCounter");
const persecCounter = document.querySelector("#persecCounter");

export function refreshUI() {
  tapCounter.textContent = `+${game.clickPower}`;
  persecCounter.textContent = `+${game.autoclicker}`;
  moneyCounter.textContent = clearNum(game.money);
}

function clearNum(x) {
  if (x >= 1000000000) {
    let result = x / 1000000000;
    return "$" + result.toFixed(2) + "B";
  } else if (x >= 1000000) {
    let result = x / 1000000;
    return "$" + result.toFixed(2) + "M";
  }

  return "$" + x.toLocaleString("ru-RU");
}

export function renderShop() {
  const shopHTML = shopItems
    .map((e) => {
      const nextPower = Math.round(e.power * Math.pow(1.15, e.count));
      const result = clearNum(e.cost);

      return `
    <li class="shop__item">
      <button class="shop__button" data-id="${e.id}">
          <div class="shop-info">
            <img src="${e.PATH}" alt="" aria-hidden="true" class="shop-info__img">
            <div class="shop-info__text">
              <p class="shop-info__desc">${e.desc}</p>
              <span class="shop-info__price">${result}</span>
            </div>
          </div>
          <span class="shop__lvl">${e.count}</span>        
      </button>
      <div class="shop-popup hidden">
        <p class="shop-popup__desc">${e.effectDesc}<p>
        <p class="shop-popup__new-power">Следующая дает: +${nextPower}</p>
      </div>  
    </li>
`;
    })
    .join("");

  shop.innerHTML = shopHTML;
}
