const board = document.getElementById('chessboard');

const aiLevel = 'medium'; // 'easy', 'medium', 'hard'

function createBoard() {
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = 'square ' + ((row + col) % 2 === 0 ? 'white' : 'black');
            square.addEventListener('click', () => playerMove(row, col));
            board.appendChild(square);
        }
    }
}

function playerMove(row, col) {
    const squares = document.querySelectorAll('.square');
    if (!squares[row * 8 + col].innerHTML) {
        squares[row * 8 + col].innerHTML = '♘'; // Player's move (Knight)
        setTimeout(aiMove, 500); // AI move after 500ms
    }
}

function aiMove() {
    const squares = document.querySelectorAll('.square');
    let row, col;

    if (aiLevel === 'hard') {
        // Simple strategy: move to first empty square found
        for (let i = 0; i < squares.length; i++) {
            row = Math.floor(i / 8);
            col = i % 8;
            if (!squares[row * 8 + col].innerHTML) {
                squares[row * 8 + col].innerHTML = '♞';
                return;
            }
        }
    } else {
        // Random move for 'easy' and 'medium' levels
        do {
            row = Math.floor(Math.random() * 8);
            col = Math.floor(Math.random() * 8);
        } while (squares[row * 8 + col].innerHTML);

        squares[row * 8 + col].innerHTML = '♞'; // AI's move (Knight)
    }
}

createBoard();