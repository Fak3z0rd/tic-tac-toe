const boardDisplay = document.querySelector(".gameboard");

const GameBoard = (function () {
    const _board = [null, null, null, null, null, null, null, null, null];

    const setCell = (playerSymbol, index) => {
        if (index > _board.length) return;
        _board[index] = playerSymbol;
    };

    const getCell = (index) => {
        if (index > _board.length) return;
        return _board[index];
    };

    const reset = () => {
        for (let cell = 0; cell < _board.length; cell++) {
            _board[cell] = null;
        }
        return _board;
    };

    const getBoard = () => {
        return _board;
    };

    return { setCell, getCell, reset, getBoard };
})();

const Player = function (symbol) {
    const _symbol = symbol;

    const getSymbol = () => {
        return _symbol;
    };

    return { getSymbol };
};

const GameController = (() => {
    const player1 = Player("X");
    const player2 = Player("O");
    let _gameOver = false;

    // Decide which player's turn it is
    const player = () => {
        return actions().length % 2 !== 0 ? player1.getSymbol() : player2.getSymbol();
    };

    // return every available cell
    const actions = () => {
        return GameBoard.getBoard().filter((cell) => cell === null);
    };

    const playRound = (player, index) => {
        GameBoard.setCell(player, index);

        if (GameController.winner(player)) {
            _gameOver = true;
            return;
        }
        if (actions().length === 0) {
            _gameOver = true;
            return;
        }
    };

    const terminal = () => {
        return _gameOver;
    };

    const utility = () => {};

    const winner = (playerSymbol) => {
        let winningRules = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningRules.some((combination) => {
            return combination.every((cell) => {
                return GameBoard.getCell(cell) === playerSymbol;
            });
        });
    };

    const reset = () => {
        _gameOver = false;
    };

    return { player, actions, winner, playRound, terminal, reset };
})();

const DisplayGameController = (() => {
    const gameCells = [...document.querySelectorAll(".cell")];
    const playerTurn = document.querySelector("[data-player]");
    const reset = document.querySelector("[data-reset]");
    const gameOverMessage = document.querySelector("[data-game-over]");

    const updateBoardDisplay = () => {
        playerTurn.textContent = GameController.player();

        return gameCells.map((cell) => {
            cell.textContent = GameBoard.getCell(cell.dataset.cell);
            return cell.textContent;
        });
    };

    const gameOverDisplay = () => {
        gameOverMessage.textContent = "Game Over!";
        gameOverMessage.classList.remove("hide");
    };

    gameCells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            let gameOver = GameController.terminal();
            if (GameBoard.getCell(e.target.dataset.cell) !== null || gameOver === true) return;
            let player = GameController.player();
            GameController.playRound(player, e.target.dataset.cell);
            updateBoardDisplay();
            gameOver = GameController.terminal();
            if (gameOver) {
                gameOverDisplay();
                return;
            }
        });
    });

    reset.addEventListener("click", () => {
        GameBoard.reset();
        GameController.reset();
        updateBoardDisplay();
        gameOverMessage.classList.add("hide");
    });
})();
