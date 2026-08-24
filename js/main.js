const menu = document.querySelector("#menu");
const play = document.querySelector("#play"); // gameplay
const getSaved = JSON.parse(localStorage.getItem("gameProgress"));
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
    };

    game.push(gameStats);
    saveGame();
  } else if (btn.dataset.action === "continue") {
    menu.classList.add("hidden");
    play.classList.remove("hidden");

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

function refreshUI(data) {
  moneyCounter.textContent = data.money;
  clickUpgradeCost.textContent = data.clickPowerUpgrade;
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
  let btnupg = e.target.closest(".shop__item-btn");
  const stats = game[0];

  if (!btnupg) return;

  if (stats.money >= stats.clickPowerUpgrade) {
    stats.money -= stats.clickPowerUpgrade;
    stats.clickPower += 1;

    stats.clickPowerUpgrade = Math.round(stats.clickPowerUpgrade * 1.5);

    refreshUI(stats);

    console.log(`Успешно! За клик теперь ${stats.clickPower}`);

    saveGame();
  }

  console.log(btnupg);
});
