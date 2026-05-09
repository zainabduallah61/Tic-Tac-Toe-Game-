const statusElement = document.querySelector('.status');
const resetButton = document.querySelector('.reset-btn');
const boxes = Array.from(document.querySelectorAll('.box'));

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function updateStatus(message) {
    statusElement.textContent = message;
}

function handleBoxClick(event) {
    const box = event.target;
    const index = Number(box.dataset.index);

    if (!running || board[index] !== '') {
        return;
    }

    board[index] = currentPlayer;
    box.textContent = currentPlayer;
    box.classList.add('disabled');

    checkResult();
}

function checkResult() {
    let winner = null;

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
            highlightWin(combination);
            break;
        }
    }

    if (winner) {
        updateStatus(`Player ${winner} wins!`);
        running = false;
        return;
    }

    if (!board.includes('')) {
        updateStatus('It is a tie!');
        running = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(`Player ${currentPlayer} turn`);
}

function highlightWin(combination) {
    combination.forEach(index => {
        boxes[index].classList.add('win');
    });
    statusElement.classList.add('win-status');
    createConfetti();
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    running = true;
    boxes.forEach(box => {
        box.textContent = '';
        box.classList.remove('disabled', 'win');
    });
    statusElement.classList.remove('win-status');
    clearConfetti();
    updateStatus(`Player ${currentPlayer} turn`);
}

boxes.forEach(box => box.addEventListener('click', handleBoxClick));
resetButton.addEventListener('click', resetGame);
updateStatus(`Player ${currentPlayer} turn`);

function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container');
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
    }
}

function clearConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    if (confettiContainer) {
        confettiContainer.remove();
    }
}
