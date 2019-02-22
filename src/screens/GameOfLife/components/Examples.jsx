export default class ExamplePlacement {
  static glidersSpawner({ rowsCount, colsCount }, { squares }) {
    if (rowsCount < 23 || colsCount < 38) {
      alert('You should have at least 23 rows and 38 cols for this example!');
      return;
    }

    let aliveCellsCoords = [
      [1, 25], [2, 23], [2, 25], [3, 13], [3, 14], [3, 21], [3, 22], [3, 35], [3, 36], [4, 12],
      [4, 16], [4, 21], [4, 22], [4, 35], [4, 36], [5, 1], [5, 2], [5, 11], [5, 17], [5, 21],
      [5, 22], [6, 1], [6, 2], [6, 11], [6, 15], [6, 17], [6, 18], [6, 23], [6, 25], [7, 11],
      [7, 17], [7, 25], [8, 12], [8, 16], [9, 13], [9, 14]
    ];
    ExamplePlacement.setCellsAlive(aliveCellsCoords, squares);

    return squares;
  }

  static setCellsAlive = (cellsToSet, squares) => {
    cellsToSet.forEach(([row, col]) => squares[row][col] = true);
  }
}
