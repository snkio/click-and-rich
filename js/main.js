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
    };

    game.push(gameStats);
    localStorage.setItem("gameProgress", JSON.stringify(game));
  } else if (btn.dataset.action === "continue") {
    menu.classList.add("hidden");
    play.classList.remove("hidden");

    moneyCounter.textContent = game[0].money;
  } else if (btn.dataset.action === "author") {
    window.location.href = "https://github.com";
  }
});

const moneyCounter = document.querySelector("#moneyCounter");
const coin = document.querySelector("#coin");

coin.addEventListener("click", () => {
  game[0].money += game[0].clickPower;

  moneyCounter.textContent = game[0].money;

  localStorage.setItem("gameProgress", JSON.stringify(game));
});
