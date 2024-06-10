// check if move is legal
function isValidPosition(row, column) {
    return row >= 0 && row < boardSize && column >= 0 && column < boardSize;
}

// create board with connected edges
function createBoard() {
    let board = new Array(boardSize);

    for (let i = 0; i < boardSize; i++) {
        board[i] = new Array(boardSize);
        for (let j = 0; j < boardSize; j++) {
            board[i][j] = [];

            allKnightMoves.forEach(move => {
                let r = i + move.r;
                let c = j + move.c;
                if (isValidPosition(r, c)) {
                    board[i][j].push({ row: r, column: c });
                }
            });
        }
    }

    return board;
}

// search for shortest path from starting position to ending position
function levelOrderSearch(startPosition, endPosition, board) {
    const startNode = { row: startPosition[0], column: startPosition[1] };
    const endNode = { row: endPosition[0], column: endPosition[1] };

    let queue = [{ position: startNode, path: [startNode] }];
    let visited = Array.from({ length: boardSize }, () => Array(boardSize).fill(false));
    visited[startNode.row][startNode.column] = true;

    while (queue.length > 0) {
        const { position, path } = queue.shift();

        if (position.row === endNode.row && position.column === endNode.column) {
            return path;
        }

        board[position.row][position.column].forEach(move => {
            let newRow = move.row;
            let newCol = move.column;

            if (isValidPosition(newRow, newCol) && !visited[newRow][newCol]) {
                visited[newRow][newCol] = true;
                queue.push({ position: { row: newRow, column: newCol }, path: [...path, { row: newRow, column: newCol }] });
            }
        });
    }
    return null;
}

function knightMoves(startPosition, endPosition) {
    let board = createBoard();
    let path = levelOrderSearch(startPosition, endPosition, board);

    let numberOfMoves = path.length - 1;
    console.log(`You made it in ${numberOfMoves} moves! Here's your path: `);
    path.forEach(move => {
        console.log([move.row, move.column]);
    });
}

const allKnightMoves = [
    { r: 2, c: 1 }, { r: 2, c: -1 }, { r: -2, c: 1 }, { r: -2, c: -1 },
    { r: 1, c: 2 }, { r: 1, c: -2 }, { r: -1, c: 2 }, { r: -1, c: -2 }
];
const boardSize = 8;
knightMoves([3, 3], [4, 3]);
