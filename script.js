const field = document.querySelector('.field');
const scoreElement = document.querySelector('.score');

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
    direction: typesDirection.LEFT,
    defaultSnakeLength: 0,
    speed: 10, // клетка/секунда
}

const size = {
    width: 30,
    heith: 30
};

let snake = [];
let matrixCell = [];
let matrix = [];

window.onload = () => {
    setScore(0);
    fillField(size.width, size.heith);
    document.addEventListener("keyup", handleKeyUp);
    startGameLoop();
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

    state.defaultSnakeLength = snake.length;

    matrix[snake[0].y][snake[0].x] = typeCell.SNAKE;
    matrix[snake[1].y][snake[1].x] = typeCell.SNAKE;

    matrix = randomApple(matrix, snake);
    draw(matrix, matrixCell);
}

function startGameLoop() {
    let timeOldMove;

    function gameLoop(time) {
        if (timeOldMove === null) {
            timeOldMove = time;
            requestAnimationFrame(gameLoop);
            return;
        }

        const timeNewMove = (time - timeOldMove);
        if (state.speed * timeNewMove / 1000 < 1 ) {
            requestAnimationFrame(gameLoop);
            return;
        }

        timeOldMove = time;

        const movedResult = move(matrix, snake, state.direction);
        matrix = movedResult.matrix;
        snake = movedResult.snake;

        if (movedResult.isDie) {
            //to do
            return;
        }

        draw(matrix, matrixCell);
        requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);
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
    const nextCoords = getNextCoords(snake, direction, matrix[0].length, matrix.length);

    const lastTypeCell = matrix[nextCoords.y][nextCoords.x];
    snake.unshift({
        x: nextCoords.x,
        y: nextCoords.y,
    });
    matrix[nextCoords.y][nextCoords.x] = typeCell.SNAKE;

    if (lastTypeCell === typeCell.APPLE) {
        eat(matrix, snake);
        
        return {
            matrix, 
            snake, 
            isDie: false,
        };
    }

    let isDie = lastTypeCell === typeCell.SNAKE && 
        snake[snake.length - 1].x === nextCoords.x && snake[snake.length - 1].y === nextCoords.y;

    matrix[snake[snake.length - 1].y][snake[snake.length - 1].x] = typeCell.EMPTY;
    snake.pop();

    return { matrix, snake, isDie };
}

function getNextCoords(snake, direction, width, height) {
    let x = snake[0].x;
    let y = snake[0].y;

    switch (direction) {
        case typesDirection.UP:
            y--;
            break;
        case typesDirection.DOWN:
            y++;
            break;
        case typesDirection.LEFT:
            x--;
            break;    
        default:
            x++;
            break;
    }

    if (x < 0) {
        x = width - 1;
    }

    if (x >= width) {
        x = 0;
    }

    if (y < 0) {
        y = height - 1;
    }

    if (y >= height) {
        y = 0;
    }

    return {
        x,
        y
    }
}

function handleKeyUp(e) {
    switch (e.key) {
        case "ArrowLeft":
            state.direction = state.direction !== typesDirection.RIGHT 
                ?typesDirection.LEFT 
                :state.direction;
            break;

        case "ArrowRight":
            state.direction = state.direction !== typesDirection.LEFT 
                ?typesDirection.RIGHT 
                :state.direction;
            break;

        case "ArrowDown":
            state.direction = state.direction !== typesDirection.UP 
                ?typesDirection.DOWN 
                :state.direction;
            break;

        case "ArrowUp":
            state.direction = state.direction !== typesDirection.DOWN 
                ?typesDirection.UP 
                :state.direction;
            break;
    
        default:
            break;
    }
}

function randomApple(matrix) {
    const freeCoords = [];

    matrix.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell !== typeCell.SNAKE) {
                freeCoords.push({x, y});
            }
        });
    });

    const appleCoords = freeCoords[Math.ceil(Math.random() * freeCoords.length)];

    matrix[appleCoords.y][appleCoords.x] = typeCell.APPLE;

    return matrix;
}

function eat(matrix, snake) {
    setScore(snake.length - state.defaultSnakeLength);
    const resultMatrix = randomApple(matrix);
    return resultMatrix;
}

function setScore(score) {
    scoreElement.textContent = score;
}
