const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let character = { x: canvas.width / 2 - 15, y: canvas.height - 50, width: 30, height: 30 };
let obstacles = [];
let score = 0;
let gameOver = false;

document.addEventListener('touchstart', moveCharacter);

function moveCharacter(e) {
    if (!gameOver) {
        const touchX = e.touches[0].clientX;
        character.x = touchX - character.width / 2;
    }
}

function spawnObstacle() {
    const x = Math.random() * (canvas.width - 30);
    obstacles.push({ x, y: 0, width: 30, height: 30 });
}

function update() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'lime';
        ctx.fillRect(character.x, character.y, character.width, character.height);

        obstacles.forEach((obstacle, index) => {
            obstacle.y += 3;
            ctx.fillStyle = 'red';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

            if (obstacle.y > canvas.height) {
                obstacles.splice(index, 1);
                score += 10;
            }

            if (character.x < obstacle.x + obstacle.width && character.x + character.width > obstacle.x &&
                character.y < obstacle.y + obstacle.height && character.y + character.height > obstacle.y) {
                gameOver = true;
            }
        });

        if (Math.random() < 0.02) {
            spawnObstacle();
        }

        requestAnimationFrame(update);
    } else {
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
        ctx.fillText('Score: ' + score, canvas.width / 2 - 60, canvas.height / 2 + 40);
    }
}

update();