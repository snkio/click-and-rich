import {
  saveGame,
  game,
  shopItems,
  updateShopItems,
  earnByClick,
  earnPassive,
} from "./state.js";
import { refreshUI, renderShop } from "./render.js";

const shop = document.querySelector("#shop");
const coin = document.querySelector("#coin");

renderShop();
refreshUI();

coin.addEventListener("click", () => {
  earnByClick(game);

  refreshUI();
  saveGame();
});

setInterval(() => {
  earnPassive(game);

  refreshUI();
  saveGame();
}, 1000);

shop.addEventListener("click", (e) => {
  let btnupg = e.target.closest(".shop__button");

  if (!btnupg) return;

  const checkAction = btnupg.dataset.id;
  const checkedId = shopItems.find((item) => item.id === checkAction);

  const gainedPower = Math.round(
    checkedId.power * Math.pow(1.15, checkedId.count),
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
        cost: Math.round(item.cost * 1.25),
      };
    }

    return item;
  });

  if (checkedId.type === "click") {
    game.clickPower += gainedPower;
  } else {
    game.autoclicker += gainedPower;
  }

  updateShopItems(newShop);

  renderShop();
  refreshUI();
  saveGame();
});
