const gameBoard = (() => {
    let board = [];
    let entries = [];
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
            if (index === 0) board[index].diag = 0;
            if (index === 2) board[index].diag = 1;
            board[index].row = 0;
            board[index].column = index;
        } else if (index >= 3 && index < 6) {
            if (index === 4) {
                board[index].diag = 2;
            }
            board[index].row = 1;
            board[index].column = index - 3;
        } else if (index >= 6 && index < 9) {
            if (index === 6) board[index].diag = 1;
            if (index === 8) board[index].diag = 0;
            board[index].row = 2;
            board[index].column = index - 6;
        }
    }

    function addClickListener(item) {
        item.addEventListener('click', userSelection, {once : true});
    }

    function userSelection() {
        if (turn === 0) {
            this.textContent = 'X';
            turn = 1;
            addToEntries(this);
        } else if (turn === 1) {
            this.textContent = 'O';
            turn = 0;
            addToEntries(this);
        }
        checkIfWinner();
        console.log(entries);
    }

    function addToEntries(item, playerNum) {
        entries.push(item);
    }

    function checkIfWinner() {
        let playerOneEntries = entries.filter(index => index.textContent === "X");
        let playerTwoEntries = entries.filter(index => index.textContent === "O");
        let playerOne = checkSelections(playerOneEntries);
        if (playerOne) alert("Player One wins!");
        let playerTwo = checkSelections(playerTwoEntries);
        if (playerTwo) alert("Player Two wins!");
        console.log(playerOne);
    }

    function checkSelections(array) {
        let row0 = 0;
        let row1 = 0;
        let row2 = 0;
        let col0 = 0;
        let col1 = 0;
        let col2 = 0;
        let diag0 = 0;
        let diag1 = 0;
        let win = false;

        function rows(num) {
           if (num === 0) row0++; 
           if (num === 1) row1++;
           if (num === 2) row2++;
           if (row0 === 3 || row1 === 3 || row2 === 3) win = true;
        }

        function columns(num) {
            if (num === 0) col0++; 
            if (num === 1) col1++;
            if (num === 2) col2++;
            if (col0 === 3 || col1 === 3 || col2 === 3) win = true;
         }

        function diagonals(num) {
            if (num === 0) diag0++; 
            if (num === 1) diag1++;
            if (num === 2) diag0++, diag1++;
            if (diag0 === 3 || diag1 === 3) win = true;
        }

        for (let item of array) {
            rows(item.row);
            columns(item.column);
            diagonals(item.diag);
        }
        return win;
    }

    createBoard();

    return {
        createBoard: createBoard,
        board: board,
        entries: entries
    };
})();

const displayController = (() => {
    function win() {

    }


})();

const Player = (playerNum) => {

}

console.log(gameBoard.board);
