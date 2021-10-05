describe("Тесты на move", function() {

});

describe("Тесты на randomApple", function() {
    
});

describe("Тесты на draw", function() {
    it("Правильно раставляет классы", function() {
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

        assert.equal(matrixCell.length, matrix.length);

        matrixCell.forEach((row, y) => {
            assert.equal(matrixCell[y].length, matrix[y].length);

            row.forEach((cell, x) => {
                assert.equal(cell.classList.contains('snake'), matrix[y][x] === typeCell.SNAKE);
                assert.equal(cell.classList.contains('apple'), matrix[y][x] === typeCell.APPLE);
            });
        });
    });
});
