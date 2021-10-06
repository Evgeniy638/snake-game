const field = document.querySelector('.field');

const typeCell = {
    APPLE: "APPLE",
    SNAKE: "SNAKE",
    EMPTY: "EMPTY",
};

const typesDirection = {
    RIGHT: "RIGHT",
    LEFT: "LEFT",
    DOWN: "DOWN",
    UP: "UP",
};

const state = {
    score,
    isLive: true,
    direction: typesDirection.LEFT
}

const size = {
    width: 30,
    heith: 30
};

let snake = [];
let matrixCell = [];
let matrix = [];

window.onload = () => {
    fillField(size.width, size.heith);
    document.addEventListener("click", handleClick);
    gameLoop();
};

function fillField(width, height) {
    for(let y = 0; y < height; y++) {
        matrix.push([]);
        matrixCell.push([]);

        for(let x = 0; x < width; x++) {
            const cell = document.createElement('div');
            cell.classList.add("cell");

            matrix[y].push(typeCell.EMPTY);
            matrixCell[y].push(cell);
            field.appendChild(cell);
        }
    }

    snake[0] = {
        x: Math.round(width / 2),
        y: Math.round(height / 2),
    };

    snake[1] = {
        x: snake[0].x + 1,
        y: snake[0].y,
    };

    matrix[snake[0].y][snake[0].x] = typeCell.SNAKE;
    matrix[snake[1].y][snake[1].x] = typeCell.SNAKE;

    matrix = randomApple(matrix, snake);
    draw(matrix, matrixCell);
}

function gameLoop() {

}

function draw(matrix, matrixCell) {
    matrix.forEach((row, y) => {
        row.forEach((cell, x) => {
            matrixCell[y][x].classList.remove('apple');
            matrixCell[y][x].classList.remove('snake');

            switch (cell) {
                case typeCell.APPLE:
                    matrixCell[y][x].classList.add('apple');
                    break;
                case typeCell.SNAKE:
                    matrixCell[y][x].classList.add('snake');
                    break;
                default:
                    break;
            }
        });
    });

    return matrixCell;
}

function move(matrix, snake, direction) {
    return { matrix, snake };
}

function handleClick(e) {

}

function randomApple(matrix) {
    return matrix;
}

function eat(matrix, x, y) {
    return matrix;
}
