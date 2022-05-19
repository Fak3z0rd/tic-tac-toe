const boardDisplay = document.querySelector(".gameboard");

const Gameboard = (function () {
    // const _board = [null, null, null, null, null, null, null, null, null];
    const _board = ["X", "O", null, null, "O", null, "X", "O", "X"];

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

    return { setCell, getCell, reset };
})();

const Player = function (symbol) {
    const _symbol = symbol;

    const getSymbol = () => {
        return _symbol;
    };

    return { getSymbol };
};

const DisplayGameController = (() => {
    const gameCells = [...document.querySelectorAll(".cell")];

    const updateBoardDisplay = () => {
        return gameCells.map((cell) => {
            cell.textContent = Gameboard.getCell(cell.dataset.cell);
            return cell.textContent;
        });
    };

    return { updateBoardDisplay };
})();

const GameController = (() => {
    const player1 = Player("X");
    const player2 = Player("O");

    // Decide which player's turn it is
    const player = () => {
        let counter = 0;
        for (let i = 0; i < 9; i++) {
            console.log(Gameboard.getCell[i]);
            if (Gameboard.getCell(i) !== null) {
                counter++;
            }
        }
        return counter % 2 === 0 ? player1 : player2;
    };

    // return every avaiable cell
    const actions = () => {
        let availableCells = [];
        for (let i = 0; i < 9; i++) {
            if (Gameboard.getCell(i) === null) {
                availableCells.push(i);
            }
        }
        return availableCells;
    };

    const playRound = (player) => {};

    const terminal = () => {};

    const utility = () => {};

    const winner = () => {
        winningRules = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    };
})();

console.log(Gameboard.getBoard());
