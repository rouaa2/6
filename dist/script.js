const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 遊戲變數
let player;
let enemies = [];
let bullets = [];
let score = 0;

// 載入圖片資源 (具體實現代碼會比較長)
const playerImage = new Image();
playerImage.src = 'images/player_fighter.png';
const enemyImage = new Image();
enemyImage.src = 'images/enemy_fighter.png';
const bulletImage = new Image();
bulletImage.src = 'images/bullet.png';

// 玩家類別
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 8;
    }

    draw() {
        ctx.drawImage(playerImage, this.x, this.y, this.width, this.height);
    }

    update() {
        // 根據鍵盤輸入更新位置
        if (keys['ArrowUp'] || keys['w']) this.y -= this.speed;
        if (keys['ArrowDown'] || keys['s']) this.y += this.speed;
        if (keys['ArrowLeft'] || keys['a']) this.x -= this.speed;
        if (keys['ArrowRight'] || keys['d']) this.x += this.speed;

        // 邊界檢查
        this.x = Math.max(0, Math.min(this.x, canvas.width - this.width));
        this.y = Math.max(0, Math.min(this.y, canvas.height - this.height));
    }

    shoot() {
        bullets.push(new Bullet(this.x + this.width / 2, this.y - 10));
    }
}

// 敵人類別 (簡化)
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 3;
    }

    draw() {
        ctx.drawImage(enemyImage, this.x, this.y, this.width, this.height);
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -50;
            this.x = Math.random() * (canvas.width - this.width);
        }
    }
}

// 子彈類別
class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.speed = -10;
    }

    draw() {
        ctx.drawImage(bulletImage, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }

    update() {
        this.y += this.speed;
    }
}

// 鍵盤輸入處理
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// 滑鼠點擊射擊
canvas.addEventListener('click', () => {
    player.shoot();
});

// 初始化遊戲
function init() {
    player = new Player(canvas.width / 2 - 15, canvas.height - 50);
    for (let i = 0; i < 5; i++) {
        enemies.push(new Enemy(Math.random() * (canvas.width - 25), Math.random() * 200));
    }
    gameLoop();
}

// 遊戲主循環
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.update();
    player.draw();

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update();
        enemies[i].draw();
    }

    for (let i = 0; i < bullets.length; i++) {
        bullets[i].update();
        bullets[i].draw();
        if (bullets[i].y < 0) {
            bullets.splice(i, 1);
            i--;
        }
    }

    // 碰撞檢測 (簡化)
    for (let i = 0; i < enemies.length; i++) {
        for (let j = 0; j < bullets.length; j++) {
            if (
                bullets[j].x > enemies[i].x &&
                bullets[j].x < enemies[i].x + enemies[i].width &&
                bullets[j].y > enemies[i].y &&
                bullets[j].y < enemies[i].y + enemies[i].height
            ) {
                enemies.splice(i, 1);
                bullets.splice(j, 1);
                score++;
                i--;
                break;
            }
        }
    }

    // 顯示分數
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText('Score: ' + score, 10, 20);

    requestAnimationFrame(gameLoop);
}

init();