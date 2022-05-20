const gameBoard = (() => {
    let board = [];
    let entries = [];
    let turn = null;

    // create basic empty board with object properties and event listeners
    const createBoard = () => {
        for (let i = 0; i < 9; i++) {
            createBox();
            addIndex(i);
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

    function addIndex(value) {
        board[value].index = value;
    }

    const addClickListener = item => item.addEventListener('click', getSelection, {once : true});
    
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
        const playerOneEntries = getIndexes(entries, "X");
        const playerTwoEntries = getIndexes(entries, "O");
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

    // get index values for each player entry
    function getIndexes(playerEntries, boxContent) {
        let array = [];
        // filter out other player's entries
        let result = playerEntries.filter(item => item.textContent === boxContent);
        result.forEach(element => array.push(element.index));
        return array;
    }

    function checkIfTie(array) {
        if (array.length === 9) {
            alert("Tie!");
            displayController.resetGame();
        }
    }

    function checkSelections(array) {
        let win = false;
        let winPattern = [
            // rows
            [0, 1, 2],
            [3, 4, 5], 
            [6, 7, 8], 
            // columns
            [0, 3, 6], 
            [1, 4, 7],
            [2, 5, 8],
            // diagonals
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < 8; i++) {
            console.log(winPattern[i]);
            // console.log(entries);
            if (winPattern[i].every(element => array.includes(element))) {
                console.log(winPattern[i]);
                win = true;
            }
        }
        return win;
    }

    function resetBoard() {
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

    function addReset() {
        const resetButton = document.querySelector('.reset');
        resetButton.addEventListener('click', resetGame);
    }

    function resetGame() {
        gameBoard.resetBoard();
        playerOneColors();
    }

    const defaultPlayerColor = () => playerOne.style.color = green;

    function showTurn(turn) {
        if (turn === 0) {
            playerTwoColors();
        } else if (turn === 1) {
            playerOneColors();
        }
    }

    const playerOneColors = () => {
        playerOne.style.color = green;
        playerTwo.style.color = '';
    }

    const playerTwoColors = () => {
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