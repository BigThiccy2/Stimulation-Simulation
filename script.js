// Basic 2D platformer like the T-Rex game
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 40;
const PLAYER_X = 100; // Fixed horizontal position
const GROUND_Y = canvas.height - 60;

const OBSTACLE_WIDTH = 20;
const OBSTACLE_HEIGHT = 40;
const OBSTACLE_SPEED = 6;

let playerY = GROUND_Y - PLAYER_HEIGHT;
let playerVY = 0;
let isJumping = false;

let obstacles = [{ x: canvas.width, y: GROUND_Y - OBSTACLE_HEIGHT }];

function drawPlayer() {
	ctx.fillStyle = '#333';
	ctx.fillRect(PLAYER_X, playerY, PLAYER_WIDTH, PLAYER_HEIGHT);
}

function drawObstacles() {
	ctx.fillStyle = '#228B22';
	obstacles.forEach(obs => {
		ctx.fillRect(obs.x, obs.y, OBSTACLE_WIDTH, OBSTACLE_HEIGHT);
	});
}

function updateObstacles() {
	obstacles.forEach(obs => {
		obs.x -= OBSTACLE_SPEED;
	});
	// Remove off-screen obstacles
	if (obstacles.length && obstacles[0].x + OBSTACLE_WIDTH < 0) {
		obstacles.shift();
	}
	// Add new obstacle
	if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - 300) {
		obstacles.push({ x: canvas.width, y: GROUND_Y - OBSTACLE_HEIGHT });
	}
}

function drawGround() {
	ctx.fillStyle = '#888';
	ctx.fillRect(0, GROUND_Y, canvas.width, 4);
}


function checkCollision() {
	for (let obs of obstacles) {
		if (
			PLAYER_X < obs.x + OBSTACLE_WIDTH &&
			PLAYER_X + PLAYER_WIDTH > obs.x &&
			playerY < obs.y + OBSTACLE_HEIGHT &&
			playerY + PLAYER_HEIGHT > obs.y
		) {
			return true;
		}
	}
	return false;
}

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGround();
	drawPlayer();
	drawObstacles();
	updateObstacles();

	if (checkCollision()) {
		ctx.font = '48px sans-serif';
		ctx.fillStyle = 'red';
		ctx.fillText('Game Over!', canvas.width / 2 - 120, canvas.height / 2);
		return; // Stop the game
	}

	requestAnimationFrame(gameLoop);
}

// Add more obstacles for variety
obstacles = [
	{ x: canvas.width, y: GROUND_Y - OBSTACLE_HEIGHT },
	{ x: canvas.width + 400, y: GROUND_Y - OBSTACLE_HEIGHT },
	{ x: canvas.width + 800, y: GROUND_Y - OBSTACLE_HEIGHT }
];

gameLoop();

gameLoop();
