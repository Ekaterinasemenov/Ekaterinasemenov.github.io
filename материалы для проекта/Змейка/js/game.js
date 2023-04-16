let
	canvas             = document.getElementById('canvas'),
	ctx                = canvas.getContext('2d'),
	scoreBlock         = document.getElementById('score'),
	scoreCount         = 0,
	bestScoreBlock     = document.getElementById('best-score'),
	dir                = '', // направление змейки
	diff               = 'Easy', // трудность
	diffBlock          = document.getElementById('difficulty'),
	btnChange          = document.getElementById('changeDif');

const config = { // Общие настройки
	sizeCell: 24,
	sizeFood: 24,
	step: 0,
	stepMax: 7,
}

const snake = { // настройки змейки
	x: config.sizeCell,
	y: config.sizeCell,
	dirX: 0, // направление X
	dirY: 0, // направление Y
	body: [],
	maxBodySize: 1,
}
const snakeSkins = [ // голова
	'./img/snake/head.jpg',
];
const snakeImages = [
	imgHead = new Image(),
];
for ( let i = 0; i < snakeImages.length; i++ ) {
	snakeImages[i].src = snakeSkins[i];
}

const food = { // еда
	x: randomInt(0, canvas.width / config.sizeCell) * config.sizeCell,
	y: randomInt(0, canvas.height / config.sizeCell) * config.sizeCell,
}
const images = [ 
	'./img/food/tr3.png',
	'./img/food/tr2.png',
];
let img = new Image();
img.src = images[0]; 

const bomb = { // бомба
	x: -config.sizeCell, 
	y: -config.sizeCell,
};
const bombImg = new Image();
bombImg.src = './img/food/bomb.png';

// аудио
const audio = [ 
	'./audio/fg.mp3',
	'./audio/turn.mp3',
	'./audio/dead.mp3',
	'./audio/hit.mp3',
];
const audioNames = [
	audioEat = new Audio(),
	audioTurn = new Audio(),
	audioDead = new Audio(),
	audioHit = new Audio(),
];
for ( let i = 0; i < audio.length; i++ ) {
	audioNames[i].src = audio[i];
}

// настройки холста
window.addEventListener('load', (e) => {
	if ( window.innerWidth <= 650 ) {
		canvas.width = 300;
		canvas.height = 300;
		ctx.fillStyle = '#000000'
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		config.sizeCell = 15;
		config.sizeFood = 15;
		canvas.style = 'background-image: url("data:img/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiBmaWxsPSJibGFjayIvPgo8Y2lyY2xlIGN4PSI3LjUiIGN5PSI3LjUiIHI9IjIuNSIgZmlsbD0iIzUxNDk0OSIvPgo8L3N2Zz4K");';
		restart();
	}
	else if ( window.innerWidth > 650 ) {
		canvas.width = 600;
		canvas.height = 480;
		ctx.fillStyle = '#000000'
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		config.sizeCell = 24;
		config.sizeFood = 24;
		canvas.style = 'background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJibGFjayIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0IiBmaWxsPSIjNTE0OTQ5Ii8+Cjwvc3ZnPgo=");';
		restart();
	}
});
//адаптивный
window.addEventListener('resize', (e) => {
	if ( window.innerWidth <= 650 ) {
		canvas.width = 300;
		canvas.height = 300;
		ctx.fillStyle = '#000000'
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		config.sizeCell = 15;
		config.sizeFood = 15;
		canvas.style = 'background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiBmaWxsPSJibGFjayIvPgo8Y2lyY2xlIGN4PSI3LjUiIGN5PSI3LjUiIHI9IjIuNSIgZmlsbD0iIzUxNDk0OSIvPgo8L3N2Zz4K");';
	}
	else if ( window.innerWidth > 650 ) {
		canvas.width = 600;
		canvas.height = 480;
		ctx.fillStyle = '#000000'
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		config.sizeCell = 24;
		config.sizeFood = 24;
		canvas.style = 'background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJibGFjayIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI0IiBmaWxsPSIjNTE0OTQ5Ii8+Cjwvc3ZnPgo=");';
	}
});

// счёт
function score() {
	scoreCount++;
	bestScore();
	if ( scoreCount > 15 ) config.stepMax = 5;
	else if ( scoreCount <= 15 ) config.stepMax = 6;
	drawScore();
}
function drawScore() {
	scoreBlock.innerHTML = scoreCount;
}
function bestScore() {
	if ( !localStorage.getItem('best score') ) {
		localStorage.setItem('best score', 0);
	}
	if ( scoreCount > localStorage.getItem('best score') ) {
		localStorage.setItem('best score', scoreCount);
	}
	bestScoreBlock.innerHTML = localStorage.getItem('best score');
}

// игра
function gameLoop() {

	requestAnimationFrame(gameLoop);

	if ( ++config.step < config.stepMax ) return;
	config.step = 0;


	ctx.clearRect(0, 0, canvas.width, canvas.height); // очистка canvas
	drawFood();
	drawSnake();
	if (diff === 'Hard') {
		ctx.strokeStyle = '#f00';
		ctx.lineWidth = 5;
		ctx.strokeRect(0, 0, canvas.width, canvas.height);
		drawBomb();
	};
}
gameLoop();

// перезапустить
function checkBorder() { // Функция, проверяющая выход за границу
	// x
	if ( snake.x < 0 ) {
		snake.x = canvas.width - config.sizeCell;
	} else if ( snake.x >= canvas.width ) {
		snake.x = 0;
	}
	// y
	if ( snake.y < 0 ) {
		snake.y = canvas.height - config.sizeCell;
	} else if ( snake.y >= canvas.height ) {
		snake.y = 0;
	}
}

function withoutBorder() { // Функция, проверяющая, не коснулась ли змея границы
	if ( snake.x < 0 ) {
		audioPlay('dead');
		restart();
	} else if ( snake.x >= canvas.width ) {
		audioPlay('dead');
		restart();
	}
	if ( snake.y < 0 ) {
		audioPlay('dead');
		restart();
	} else if ( snake.y >= canvas.height ) {
		audioPlay('dead');
		restart();
	}
}

function restart() { // Функция перезапуска игры
	config.stepMax = 6;
	scoreCount = 0;
	drawScore();

	snake.x = config.sizeCell;
	snake.y = config.sizeCell;
	snake.body = [];
	snake.maxBodySize = 1;
	snake.dirX = 0;
	snake.dirY = 0;
	dir = '';

	randomPosFood();
	if ( diff === 'Hard' ) randomPosBomb();
}


// нарисовать змею
function drawSnake() {
	snake.x += snake.dirX;
	snake.y += snake.dirY;

	if (diff === 'Easy') checkBorder();
	if (diff === 'Hard') withoutBorder();

	// работа с длиной змейки
	snake.body.unshift({x: snake.x, y: snake.y});
	if ( snake.body.length > snake.maxBodySize ) {
		snake.body.pop();
	}

	snake.body.forEach((e, index) => {

		snakeStyles(e, index); // стили змеи

		if ( e.x == food.x && e.y == food.y ) { // если змейка съела еду
			audioPlay('eat');
			score();
			randomPosFood();
			snake.maxBodySize++;

			if ( diff === 'Hard' ) {
				randomPosBomb();
			}
		}

		if ( diff === 'Hard' ) { // если змея коснулась бомбы, уменьшите длину змеи
			if ( e.x === bomb.x && e.y === bomb.y ) {
				if ( scoreCount >= 2 ) {
					audioPlay('hit');
					scoreCount = Math.ceil(scoreCount / 2);
					snake.maxBodySize = scoreCount + 1;
					for ( let i = 0; i < snake.maxBodySize; i++ ) {
						snake.body.pop();
					}
					drawScore();
					randomPosFood();
					randomPosBomb();
				} else {
					audioPlay('dead');
					restart()
				}
			}
		}

		// Проверка, не коснулась ли змея хвоста
		for ( let i = index + 1; i < snake.body.length; i++ ) {
			if ( e.x === snake.body[i].x && e.y === snake.body[i].y ) {
				audioPlay('dead');
				restart();
			}
		}
	});
}
// стили змейки
function snakeStyles(e, index) {
	if ( index === 0 ) { // для первого элемента змеи (головы)
		ctx.drawImage(snakeImages[0], e.x, e.y, config.sizeCell, config.sizeCell);
	}
	else { // другие элементы
		ctx.fillStyle = '#093D14';
		ctx.strokeStyle = '#071510';
		ctx.lineWidth = 1;
		ctx.fillRect(e.x, e.y, config.sizeCell, config.sizeCell);
		ctx.strokeRect(e.x, e.y, config.sizeCell - 1, config.sizeCell - 1);
	}
}

// рисовать еду
function drawFood() {
	ctx.drawImage(img, food.x, food.y, config.sizeFood, config.sizeFood);
}

// рисовать бомбу
function drawBomb() { // функция добовления бомбы
	ctx.drawImage(bombImg, bomb.x, bomb.y, config.sizeFood, config.sizeFood);
}

// Загрузить лучший результат
document.addEventListener('load', bestScore());

// контроль
function turnUp() {
	if ( dir != 'down' ) {
		audioPlay('turn');
		dir = 'up';
		snake.dirY = -config.sizeCell;
		snake.dirX = 0;
	}
}
function turnLeft() {
	if ( dir != 'right' ) {
		audioPlay('turn');
		dir = 'left';
		snake.dirX = -config.sizeCell;
		snake.dirY = 0;
	}
}
function turnDown() {
	if ( dir != 'up' ) {
		audioPlay('turn');
		dir = 'down';
		snake.dirY = config.sizeCell;
		snake.dirX = 0;
	}
}
function turnRight() {
	if ( dir != 'left' ) {
		audioPlay('turn');
		dir = 'right';
		snake.dirX = config.sizeCell;
		snake.dirY = 0;
	}
}

document.addEventListener('keydown', (e) => {
	if ( e.keyCode == 87 || e.keyCode == 38 ) { // W (вверх)
		turnUp();
	}
	else if ( e.keyCode == 65 || e.keyCode == 37 ) { // A (влево)
		turnLeft();
	}
	else if ( e.keyCode == 83 || e.keyCode == 40 ) { // S (вниз)
		turnDown();
	}
	else if ( e.keyCode == 68 || e.keyCode == 39 ) { // D (вправо)
		turnRight();
	}
});

// трогать
const isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

if ( isMobile.any() ) {
	alert('Please click any where for play game sounds');

	document.addEventListener('touchstart', handleTouchStart);
	document.addEventListener('touchmove', handleTouchMove);

	let x1 = null;
	let y1 = null;

	function handleTouchStart(event) {
		const firstTouch = event.touches[0];
		x1 = firstTouch.clientX;
		y1 = firstTouch.clientY;
	}
	function handleTouchMove(event) {
		if ( !x1 || !y1 ) return false; // проверить свайп
		let x2 = event.touches[0].clientX;
		let y2 = event.touches[0].clientY;

		let xDiff = x2 - x1;
		let yDiff = y2 - y1;

		if ( Math.abs(xDiff) > Math.abs(yDiff) ) {
			// свайп влево или вправо
			xDiff > 0 ? turnRight() : turnLeft();
		} else {
			// свайп вверх или вниз
			yDiff < 0 ? turnUp() : turnDown();
		}

		x1 = null;
		y1 = null;
	}
}

// изменить сложность
btnChange.addEventListener('click', (e) => {
	if ( diff === 'Easy' ) {
		diff = 'Hard';
		diffBlock.innerHTML = 'Hard';
		restart();
	} else {
		diff = 'Easy';
		diffBlock.innerHTML = 'Easy';
		restart();
	}
});


// Дополнительные функции
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
function randomImg() { // случайное изображение (для еды)
	let imgCount = randomInt(0, images.length);
	let imgPath = images[imgCount];
	img.src = imgPath;
	return img;
}

function randomPosFood() { // случайная позиция еды
	ctx.drawImage(randomImg(), food.x, food.y, config.sizeFood, config.sizeFood);
	food.x = randomInt(0, canvas.width / config.sizeCell) * config.sizeCell;
	food.y = randomInt(0, canvas.height / config.sizeCell) * config.sizeCell;
	drawFood();
}

function randomPosBomb() { // случайная позиция бомбы
	let chance = randomInt(1, 5);
	if ( chance === 3 ) {
		bomb.x = randomInt(0, canvas.width / config.sizeCell) * config.sizeCell;
		bomb.y = randomInt(0, canvas.height / config.sizeCell) * config.sizeCell;
		drawBomb();
	}
	else {
		bomb.x = -config.sizeCell;
		bomb.y = -config.sizeCell;
		drawBomb();
	}
}

function audioPlay(name) { // проигрывание аудио
	if ( name === 'eat' ) {
		audioNames[0].play();
	}
	if ( name === 'turn' ) {
		audioNames[1].play();
	}
	if ( name === 'dead' ) {
		audioNames[2].play();
	}
	if ( name === 'hit' ) {
		audioNames[3].play();
	}
}