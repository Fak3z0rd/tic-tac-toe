const boardDisplay = document.querySelector(".gameboard");
const Gameboard = (() => {
    let board = [null, null, null, null, null, null, null, null, null];

    const createBoard = () => {
        board.forEach((cell) => {
            let div = document.createElement("div");
            div.className = "cell"
            boardDisplay.append(div)
        });
    };

    return { createBoard };
})();

const Player = (sign) => {
    this.sign = sign;

    return { sign };
};

let gameboard = Gameboard.createBoard();
