const menu = document.querySelector("#menu");
const play = document.querySelector("#play"); // gameplay
const getSaved = JSON.parse(localStorage.getItem("gameProgress"));
let isGameStarted = false;
const game = getSaved || [];

if (game.length === 0) {
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
    console.log("Играем");
    game.length = 0;

    menu.classList.add("hidden");
    play.classList.remove("hidden");

    const gameStats = {
      money: 0,
      clickPower: 1,
      autoclicker: 0,
      clickPowerUpgrade: 15,
      autoClickerUpgrade: 100,
    };

    isGameStarted = true;
    game.push(gameStats);
    saveGame();
  } else if (btn.dataset.action === "continue") {
    menu.classList.add("hidden");
    play.classList.remove("hidden");
    isGameStarted = true;

    refreshUI(game[0]);
  } else if (btn.dataset.action === "author") {
    window.location.href = "https://github.com";
  }
});

// ======= GAME =======
const moneyCounter = document.querySelector("#moneyCounter");
const shop = document.querySelector("#shop");
const coin = document.querySelector("#coin");

const clickUpgradeCost = document.querySelector("#clickUpgradeCost");
const autoClickerUpgradeCost = document.querySelector(
  "#autoClickerUpgradeCost",
);

setInterval(() => {
  if (!isGameStarted) return;

  const stats = game[0];
  stats.money += stats.autoclicker;

  refreshUI(stats);
  saveGame();
}, 1000);

function refreshUI(data) {
  moneyCounter.textContent = data.money;
  clickUpgradeCost.textContent = data.clickPowerUpgrade;
  autoClickerUpgradeCost.textContent = data.autoClickerUpgrade;
}

function saveGame() {
  localStorage.setItem("gameProgress", JSON.stringify(game));
}

coin.addEventListener("click", () => {
  const stats = game[0];
  stats.money += stats.clickPower;

  refreshUI(stats);

  saveGame();
});

shop.addEventListener("click", (e) => {
  const stats = game[0];

  let btnupg = e.target.closest(".shop__item-btn");

  if (!btnupg) return;

  const checkAction = btnupg.dataset.action;

  if (checkAction === "buy-click") {
    if (stats.money >= stats.clickPowerUpgrade) {
      stats.money -= stats.clickPowerUpgrade;
      stats.clickPower += 1;

      stats.clickPowerUpgrade = Math.round(stats.clickPowerUpgrade * 1.5);

      refreshUI(stats);

      console.log(`Успешно! За клик теперь ${stats.clickPower}`);

      saveGame();
    } else {
      console.log("Недостаточно средств");
    }
  } else if (checkAction === "buy-autoclick") {
    if (stats.money >= stats.autoClickerUpgrade) {
      stats.money -= stats.autoClickerUpgrade;
      stats.autoclicker += 1;

      stats.autoClickerUpgrade = Math.round(stats.autoClickerUpgrade * 2);

      refreshUI(stats);

      console.log(`Успешно! Автоклик теперь ${stats.autoclicker}`);

      saveGame();
    } else {
      console.log("Недостаточно средств");
    }
  }

  console.log(btnupg);
});
