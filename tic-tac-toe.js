const gameBoard = (() => {
    let board = [];
    const container = document.querySelector('.container');

    // create basic empty board
    function createBoard() {
        for (let i = 0; i < 9; i++) {
            const box = document.createElement('div');
            container.appendChild(box);
            board.push(box);

            // add row, column, diagonal attributes
            if (i < 3) {
                if (i === 0) board[i].diag0 = 0;
                if (i === 2) board[i].diag1 = 0;
                board[i].row = 0;
                board[i].column = i;
            } else if (i >= 3 && i < 6) {
                if (i === 4) {
                    board[i].diag0 = 0;
                    board[i].diag1 = 0;
                }
                board[i].row = 1;
                board[i].column = i - 3;
            } else if (i >= 6 && i < 9) {
                if (i === 6) board[i].diag1 = 0;
                if (i === 8) board[i].diag0 = 0;
                board[i].row = 2;
                board[i].column = i - 6;
            }
        }
    }

    createBoard();
    // 

    return {
        createBoard: createBoard,
        board: board
    };
})();

const displayController = (() => {

})();

let newBoard = gameBoard.board;
// console.log(gameBoard.board);
console.log(newBoard);