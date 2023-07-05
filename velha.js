const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer} turn`;
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
    changePlayer();
}

function updateCell(cell, cellIndex) {
    options[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer} turn`;
}

function checkWinner() {
    for (let i = 0; i < winCondition.length; i++) {
        const [a, b, c] = winCondition[i];
        if (
            options[a] === currentPlayer &&
            options[b] === currentPlayer &&
            options[c] === currentPlayer
        ) {
            statusText.textContent = `${currentPlayer} wins!`;
            running = false;
            return;
        }
    }
    if (!options.includes("")) {
        statusText.textContent = "It's a tie!";
        running = false;
    }
}

function restartGame() {
    options = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    running = true;
    statusText.textContent = `${currentPlayer} turn`;
    cells.forEach(cell => {
        cell.textContent = "";
    });
}
