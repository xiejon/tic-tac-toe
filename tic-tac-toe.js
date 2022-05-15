const displayController = (() => {
})();

const gameBoard = (() => {
    let board = [];
    let turn = 0;
    const container = document.querySelector('.container');

    // create basic empty board with attributes and event listeners
    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const box = document.createElement('div');
            box.classList.add('.box');
            container.appendChild(box);
            board.push(box);
            addAttributes(i);
            addClickListener(box);
        }
    }

    function addAttributes(index) {
        if (index < 3) {
            if (index === 0) board[index].diag0 = 0;
            if (index === 2) board[index].diag1 = 0;
            board[index].row = 0;
            board[index].column = index;
        } else if (index >= 3 && index < 6) {
            if (index === 4) {
                board[index].diag0 = 0;
                board[index].diag1 = 0;
            }
            board[index].row = 1;
            board[index].column = index - 3;
        } else if (index >= 6 && index < 9) {
            if (index === 6) board[index].diag1 = 0;
            if (index === 8) board[index].diag0 = 0;
            board[index].row = 2;
            board[index].column = index - 6;
        }
    }

    function addClickListener(item) {
        item.addEventListener('click', userSelection);
    }

    function userSelection() {
        if (turn === 0) {
            this.textContent = 'X';
            turn = 1;
        } else if (turn === 1) {
            this.textContent = 'O';
            turn = 0;
        }
        console.log('hello');
    }

    createBoard();

    return {
        createBoard: createBoard,
        board: board
    };
})();


const Player = (playerNum) => {

}

let newBoard = gameBoard.board;
// console.log(gameBoard.board);
console.log(newBoard);
