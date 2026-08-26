const moneyCounter = document.querySelector("#moneyCounter");
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
  { id: "buy-click", desc: "Прокачка клика (+1 мон/клик)", cost: 15, count: 0 },
  { id: "buy-autoclick", desc: "Автокликер (+1 мон/сек)", cost: 100, count: 0 },
];

if (!getSaved) {
  const newGameTemplate = `
    <nav class="main__nav">
        <ul class="main__list">
            <li class="main__elem" data-action="new-game">Играть</li>
            <li class="main__elem" data-action="author">Ссылка на автора</li>
        <ul>
    </nav>
`;

  menu.insertAdjacentHTML("beforeend", newGameTemplate);
} else {
  const continueGameTemplate = `
    <nav class="main__nav">
        <ul class="main__list">
            <li class="main__elem" data-action="continue">Продолжить игру</li>
            <li class="main__elem" data-action="new-game">Начать игру заново</li>
            <li class="main__elem" data-action="author">Ссылка на автора</li>
        <ul>
    </nav>
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
        desc: "Прокачка клика (+1 мон/клик)",
        cost: 15,
        count: 0,
      },
      {
        id: "buy-autoclick",
        desc: "Автокликер (+1 мон/сек)",
        cost: 100,
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
    const shopTemplate = `
    <li class="shop__item">
          <p class="shop__item-text">${e.desc} / ${e.count}</p>
          <button
            class="shop__item-btn"
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
  let btnupg = e.target.closest(".shop__item-btn");

  if (!btnupg) return;

  const checkAction = btnupg.dataset.id;
  const checkedId = shopItems.find((item) => item.id === checkAction);

  console.log(checkedId);

  if (game.money >= checkedId.cost) {
    game.money -= checkedId.cost;

    checkedId.count += 1;

    if (checkedId.id === "buy-click") {
      game.clickPower += 1;
    } else if (checkedId.id === "buy-autoclick") {
      game.autoclicker += 1;
    }

    console.log("Приобретено");

    checkedId.cost = Math.round(checkedId.cost * 1.5);

    renderShop();
    refreshUI();
    saveGame();
  } else {
    console.log("Недостаточно средств");
  }
});
