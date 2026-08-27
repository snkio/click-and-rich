import {
  saveGame,
  game,
  shopItems,
  getSaved,
  updateShopItems,
} from "./state.js";
import { refreshUI, renderShop } from "./render.js";

const shop = document.querySelector("#shop");
const coin = document.querySelector("#coin");
const menu = document.querySelector("#menu");
const play = document.querySelector("#play"); // gameplay

let isGameStarted = false;

if (!getSaved) {
  const newGameTemplate = `
       <li class="main__elem" data-action="new-game">Играть</li>
       <li class="main__elem" data-action="author">Ссылка на автора</li>
`;

  menu.insertAdjacentHTML("beforeend", newGameTemplate);
} else {
  const continueGameTemplate = `
        <li class="main__elem" data-action="continue">Продолжить игру</li>
        <li class="main__elem" data-action="new-game">Начать игру заново</li>
        <li class="main__elem" data-action="author">Ссылка на автора</li>
    `;

  menu.insertAdjacentHTML("beforeend", continueGameTemplate);
}

menu.addEventListener("click", (e) => {
  let btn = e.target.closest(".main__elem");
  if (!btn) return;

  if (btn.dataset.action === "new-game") {
    menu.classList.add("hidden");
    play.classList.remove("hidden");

    game.money = 0;
    game.clickPower = 1;
    game.autoclicker = 0;

    shopItems = [
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

    isGameStarted = true;

    console.log(game);
    renderShop();
    saveGame();
  } else if (btn.dataset.action === "continue") {
    menu.classList.add("hidden");
    play.classList.remove("hidden");
    isGameStarted = true;

    renderShop();
    refreshUI();
  } else if (btn.dataset.action === "author") {
    window.location.href = "https://github.com/snkio";
  }
});

setInterval(() => {
  if (!isGameStarted) return;

  game.money += game.autoclicker;

  refreshUI();
  saveGame();
}, 1000);

coin.addEventListener("click", () => {
  game.money += game.clickPower;

  refreshUI();
  saveGame();
});

shop.addEventListener("click", (e) => {
  let btnupg = e.target.closest(".shop__button");

  if (!btnupg) return;

  const checkAction = btnupg.dataset.id;
  const checkedId = shopItems.find((item) => item.id === checkAction);

  const gainedPower = Math.round(
    checkedId.power * Math.pow(1.4, checkedId.count),
  );

  if (game.money >= checkedId.cost) {
    game.money -= checkedId.cost;
  } else {
    console.log("Недостаточно средств");
    return;
  }

  const newShop = shopItems.map((item) => {
    if (item.id === checkedId.id) {
      return {
        ...item,
        count: item.count + 1,
        cost: Math.round(item.cost * 1.5),
      };
    }

    return item;
  });

  if (checkedId.id === "buy-click") {
    game.clickPower += gainedPower;
  } else if (checkedId.id === "buy-autoclick") {
    game.autoclicker += gainedPower;
  }

  updateShopItems(newShop);

  renderShop();
  refreshUI();
  saveGame();
});
