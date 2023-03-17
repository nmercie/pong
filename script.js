const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Initial positions
const paddleHeight = 100;
const paddleWidth = 10;
let paddleAY = (canvas.height - paddleHeight) / 2;
let paddleBY = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 2;
let ballSpeedY = 2;

// Paddle movement
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && paddleAY > 0) {
        paddleAY -= 10;
    }
    if (e.key === "ArrowDown" && paddleAY < canvas.height - paddleHeight) {
        paddleAY += 10;
    }
});

// Main game loop
setInterval(() => {
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Bounce ball from top and bottom
    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Bounce ball from paddles
    if ((ballX < paddleWidth && ballY > paddleAY && ballY < paddleAY + paddleHeight) ||
        (ballX > canvas.width - paddleWidth && ballY > paddleBY && ballY < paddleBY + paddleHeight)) {
        ballSpeedX = -ballSpeedX;
    }

    // Move paddle B
    if (paddleBY + paddleHeight / 2 < ballY) {
        paddleBY += 1;
    }
    else {
        paddleBY -= 1;
    }

    // Draw elements
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, paddleAY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, paddleBY, paddleWidth, paddleHeight);

    ctx.beginPath();
    ctx.arc(ballX, ballY, 5, 0, Math.PI * 2, false);
    ctx.fill();
}, 1000 / 60);