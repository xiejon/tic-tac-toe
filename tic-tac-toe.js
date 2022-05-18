const gameBoard = (() => {
    let board = [];
    let entries = [];
    let turn = null;

    // create basic empty board with attributes and event listeners
    const createBoard = () => {
        for (let i = 0; i < 9; i++) {
            createBox();
            addAttributes(i);
        }
    }

    function createBox() {
        const container = document.querySelector('.game');
        const box = document.createElement('div');
        box.classList.add('box');
        container.appendChild(box);
        board.push(box);
        addClickListener(box);
    }

    function addAttributes(index) {
        if (index < 3) {
            if (index === 0) board[index].diag = 0;
            if (index === 2) board[index].diag = 1;
            board[index].row = 0;
            board[index].column = index;
        } else if (index >= 3 && index < 6) {
            if (index === 4) board[index].diag = 2;
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
        item.addEventListener('click', getSelection, {once : true});
    }

    function getSelection() {
        // first round
        if (turn === null) {
            turn = 0;
        }
        if (turn === 0) {
            this.textContent = 'X';
            displayController.showTurn(turn);
            turn = 1;
            addToEntries(this);
        } else if (turn === 1) {
            this.textContent = 'O';
            displayController.showTurn(turn);
            turn = 0;
            addToEntries(this);
        }
        checkIfWinner();
        checkIfTie(entries);
    }

    // keep track of which divs were selected in separate array
    function addToEntries(item) {
        entries.push(item);
    }

    function checkIfWinner() {
        const playerOneEntries = entries.filter(index => index.textContent === "X");
        const playerTwoEntries = entries.filter(index => index.textContent === "O");
        const playerOne = checkSelections(playerOneEntries);
        const playerTwo = checkSelections(playerTwoEntries);
        if (playerOne) {
            alert("Player One wins!");
            displayController.resetGame();
        }
        if (playerTwo) {
            alert("Player Two wins!");
            displayController.resetGame();
        }
    }

    function checkIfTie(array) {
        if (array.length === 9) {
            alert("Tie!");
            displayController.resetGame();
        }
    }

    function checkSelections(array) {
        // keep track of count in each row/column/diag
        let [row0, row1, row2] = [0, 0, 0]
        let [col0, col1, col2] = [0, 0, 0]
        let [diag0, diag1] = [0, 0]
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

        for (let selection of array) {
            rows(selection.row);
            columns(selection.column);
            diagonals(selection.diag);
        }
        return win;
    }

    const resetBoard = () => {
        board = [];
        entries = [];
        turn = 0;
        clearBoxes();
        createBoard();
    }

    function clearBoxes() {
        const boxes = document.querySelectorAll('.box');
        for (let box of boxes) {
            box.remove();
        }
    }

    return {
        createBoard,
        resetBoard
    };
})();

const displayController = (() => {

    // select 'player' text
    const playerOne = document.querySelector('.player-one');
    const playerTwo = document.querySelector('.player-two');
    const green = 'var(--acid-green)';

    const addReset = () => {
        const resetButton = document.querySelector('.reset');
        resetButton.addEventListener('click', resetGame);
    }

    function resetGame() {
        gameBoard.resetBoard();
        playerOneColors();
    }

    function defaultPlayerColor() {
        playerOne.style.color = green;
    }

    function showTurn(turn) {
        if (turn === 0) {
            playerTwoColors();
        } else if (turn === 1) {
            playerOneColors();
        }
    }

    function playerOneColors() {
        playerOne.style.color = green;
        playerTwo.style.color = '';
    }

    function playerTwoColors() {
        playerOne.style.color = '';
        playerTwo.style.color = green;
    }

    gameBoard.createBoard();
    addReset();
    defaultPlayerColor();

    return {
        resetGame: resetGame,
        showTurn: showTurn
    }
})();