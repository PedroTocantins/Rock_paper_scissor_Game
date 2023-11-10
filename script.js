const MOVES = {
  ROCK: "rock",
  PAPER: "paper",
  SCISSOR: "scissor",
};

const MOVE_ICONS = {
  rock: {
    iconClass: "fa-hand-fist",
  },
  paper: {
    iconClass: "fa-hand",
  },
  scissor: {
    iconClass: "fa-hand-peace",
  },
};

const SCORE_KEY = "score";

const winsNumber = document.querySelector("#wins-number");
const lossesNumber = document.querySelector("#losses-number");
const tiesNumber = document.querySelector("#ties-number");
const userMoveElement = document.querySelector(".user-move");
const cpuMoveElement = document.querySelector(".cpu-move");
const bothMovesElement = document.querySelector(".both-moves");
const resultElement = document.querySelector(".result");

function generateCPUMove() {
  const randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return MOVES.ROCK;
    case 1:
      return MOVES.PAPER;
    default:
      return MOVES.SCISSOR;
  }
}

function playGame(playerMove) {
  let cpuMove = generateCPUMove();
  let result = "";

  if (playerMove === cpuMove) {
    result = "its tie";
    score.ties++;
  } else if (
    (playerMove === MOVES.ROCK && cpuMove === MOVES.SCISSOR) ||
    (playerMove === MOVES.PAPER && cpuMove === MOVES.ROCK) ||
    (playerMove === MOVES.SCISSOR && cpuMove === MOVES.PAPER)
  ) {
    result = "You Win";
    score.wins++;
  } else {
    result = "You Lose";
    score.losses++;
  }
  console.log(score)

  localStorage.setItem(SCORE_KEY, JSON.stringify(score));
  changeStatus(score, result, { playerMove, cpuMove });
}

function changeStatus(score, resultText, { playerMove, cpuMove }) {
  winsNumber.textContent = score.wins;
  lossesNumber.textContent = score.losses;
  tiesNumber.textContent = score.ties;
  resultElement.textContent = resultText;

  let iconUser = returnIcons(playerMove);
  let iconCPU = returnIcons(cpuMove);

  userMoveElement.innerHTML = `<i class="fa-solid ${iconUser}"></i>
    <p>You</p>`;
  cpuMoveElement.innerHTML = `<i class="fa-solid ${iconCPU}"></i>
    <p>CPU</p>`;

  bothMovesElement.classList.remove("no-visibilite");
  resultElement.classList.remove("no-visibilite");
}


function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem(SCORE_KEY);
  changeStatus(score, "", "");
  resultElement.classList.add("no-visibilite");
  bothMovesElement.classList.add("no-visibilite");
}

let score = JSON.parse(localStorage.getItem(SCORE_KEY)) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

function returnIcons(move) {
  switch (move) {
    case MOVES.ROCK:
      return MOVE_ICONS.rock.iconClass;
    case MOVES.PAPER:
      return MOVE_ICONS.paper.iconClass;
    case MOVES.SCISSOR:
      return MOVE_ICONS.scissor.iconClass;
  }
}
