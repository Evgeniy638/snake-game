describe("Тесты на змейку", function () {
    it("Тесты на randomApple", function () {
        const matrix = [
            [typeCell.SNAKE, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.SNAKE],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
        ];

        const result = randomApple(matrix);

        let isCreateApple = false;

        assert.equal(result.length, matrix.length, 'размерность матриц должна совпадать');

        result.forEach((row, y) => {
            assert.equal(result[y].length, matrix[y].length, 'размерность матриц должна совпадать');

            row.forEach((cell, x) => {
                if (cell === typeCell.APPLE) {
                    assert.ok(matrix[y][x] !== typeCell.SNAKE, 'не должен создавать яблоко в змейке');
                    isCreateApple = true;
                }
            });
        });

        assert.ok(isCreateApple, 'должен создать яблоко');
    });


    it("Тесты на move", function () {
        const matrix1 = [
            [typeCell.SNAKE, typeCell.SNAKE, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
        ];

        const snake1 = [
            {
                x: 0,
                y: 0,
            },
            {
                x: 1,
                y: 0,
            },
        ];

        const matrix2 = [
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.SNAKE, typeCell.SNAKE],
        ];

        const snake2 = [
            {
                x: 3,
                y: 4,
            },
            {
                x: 4,
                y: 4,
            },
        ];

        const resultUp = move(matrix1, snake1, typesDirection.UP);
        const resultDown = move(matrix2, snake2, typesDirection.DOWN);
        const resultLeft = move(matrix1, snake1, typesDirection.LEFT);
        const resultRight = move(matrix2, snake2, typesDirection.RIGHT);

        assert.equal(resultUp.snake.length, snake1.length, 'Змея должна сохранить свою длину');
        assert.equal(resultDown.snake.length, snake2.length, 'Змея должна сохранить свою длину');
        assert.equal(resultLeft.snake.length, snake1.length, 'Змея должна сохранить свою длину');
        assert.equal(resultRight.snake.length, snake2.length, 'Змея должна сохранить свою длину');

        assert.equal(resultUp.snake[0].x, snake1[0].x,'Корректно переходит вверх');
        assert.equal(resultUp.snake[0].y, 4, 'Корректно переходит вверх');
        assert.equal(resultUp.snake[1].x, snake1[0].x, 'Корректно переходит вверх');
        assert.equal(resultUp.snake[1].y, snake1[0].y, 'Корректно переходит вверх');

        assert.equal(resultDown.snake[0].x, snake2[0].x,'Корректно переходит вниз');
        assert.equal(resultDown.snake[0].y, 0, 'Корректно переходит вниз');
        assert.equal(resultDown.snake[1].x, snake2[0].x, 'Корректно переходит вниз');
        assert.equal(resultDown.snake[1].y, snake2[0].y, 'Корректно переходит вниз');

        assert.equal(resultLeft.snake[0].x, 4,'Корректно переходит налево');
        assert.equal(resultLeft.snake[0].y, snake1[0].y, 'Корректно переходит налево');
        assert.equal(resultLeft.snake[1].x, snake1[0].x, 'Корректно переходит налево');
        assert.equal(resultLeft.snake[1].y, snake1[0].y, 'Корректно переходит налево');
        
        assert.equal(resultRight.snake[0].x, 0,'Корректно переходит направо');
        assert.equal(resultRight.snake[0].y, snake2[0].y, 'Корректно переходит направо');
        assert.equal(resultRight.snake[1].x, snake2[0].x, 'Корректно переходит направо');
        assert.equal(resultRight.snake[1].y, snake2[0].y, 'Корректно переходит направо');
    });

    it("Тесты на draw", function () {
        const matrix = [
            [typeCell.SNAKE, typeCell.APPLE, typeCell.EMPTY, typeCell.EMPTY, typeCell.SNAKE],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
        ];

        let matrixCell = [];

        for (let y = 0; y < matrix.length; y++) {
            matrixCell.push([]);

            for (let x = 0; x < matrix[0].length; x++) {
                const cell = document.createElement('div');
                cell.classList.add("cell");
                matrixCell[y].push(cell);
            }
        }

        matrixCell = draw(matrix, matrixCell);

        assert.equal(matrixCell.length, matrix.length, 'размерность матриц должна совпадать');

        matrixCell.forEach((row, y) => {
            assert.equal(matrixCell[y].length, matrix[y].length, 'размерность матриц должна совпадать');

            row.forEach((cell, x) => {
                assert.equal(cell.classList.contains('snake'), matrix[y][x] === typeCell.SNAKE, "Правильно раставляет классы");
                assert.equal(cell.classList.contains('apple'), matrix[y][x] === typeCell.APPLE, "Правильно раставляет классы");
            });
        });
    });

});
