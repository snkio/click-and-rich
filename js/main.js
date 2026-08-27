const moneyCounter = document.querySelector("#moneyCounter");
const tapCounter = document.querySelector("#tapCounter");
const persecCounter = document.querySelector("#persecCounter");
const shop = document.querySelector("#shop");
const coin = document.querySelector("#coin");
const menu = document.querySelector("#menu");
const play = document.querySelector("#play"); // gameplay
const getSaved = JSON.parse(localStorage.getItem("gameProgress"));
const getSavedShop = JSON.parse(localStorage.getItem("shopProgress"));
let isGameStarted = false;

const game = getSaved || {
  money: 0,
  clickPower: 1,
  autoclicker: 0,
};

let shopItems = getSavedShop || [
  {
    id: "buy-click",
    desc: "Прокачка клика (+1 мон/клик)",
    cost: 15,
    power: 1,
    count: 0,
  },
  {
    id: "buy-autoclick",
    desc: "Автокликер (+1 мон/сек)",
    cost: 100,
    power: 1,
    count: 0,
  },
];

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
    window.location.href = "https://github.com";
  }
});

// ======= GAME =======

function refreshUI() {
  tapCounter.textContent = game.clickPower;
  persecCounter.textContent = game.autoclicker;
  moneyCounter.textContent = game.money;
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

function saveGame() {
  localStorage.setItem("gameProgress", JSON.stringify(game));
  localStorage.setItem("shopProgress", JSON.stringify(shopItems));
}

// ====================

function renderShop() {
  shop.innerHTML = "";

  shopItems.forEach((e) => {
    const nextPower = Math.round(e.power * Math.pow(1.4, e.count));

    const shopTemplate = `
    <li class="shop__item">
          <p class="shop__text">${e.desc} [Ур. ${e.count}] (Следующая сила: +${nextPower})</p>
          <button
            class="shop__button"
            data-id="${e.id}"
          >
            Купить за <span>${e.cost}</span> монет
        </button>
    </li>
`;

    shop.insertAdjacentHTML("beforeend", shopTemplate);
  });
}

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

    if (checkedId.id === "buy-click") {
      game.clickPower += gainedPower;
    } else if (checkedId.id === "buy-autoclick") {
      game.autoclicker += gainedPower;
    }

    checkedId.count += 1;
    checkedId.cost = Math.round(checkedId.cost * 1.5);

    console.log("Приобретено");

    renderShop();
    refreshUI();
    saveGame();
  } else {
    console.log("Недостаточно средств");
  }
});
