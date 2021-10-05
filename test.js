describe("Тесты на змейку", function() {
    it("Тесты на randomApple", function() {
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

    it("Тесты на randomApple", function() {
    
    });

    it("Тесты на draw", function() {
        const matrix = [
            [typeCell.SNAKE, typeCell.APPLE, typeCell.EMPTY, typeCell.EMPTY, typeCell.SNAKE],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
            [typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY, typeCell.EMPTY],
        ];

        let matrixCell = [];

        for(let y = 0; y < matrix.length; y++) {
            matrixCell.push([]);
    
            for(let x = 0; x < matrix[0].length; x++) {
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
