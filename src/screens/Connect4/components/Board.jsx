import Board from '../../../components/Board/';

import './Board.css'

export default class Connect4Board extends Board {
  initState = () => ({
    squares: Array(this.props.rowsCount).fill().map(() => Array(this.props.colsCount).fill(null)),
    currentPlayerIndex: 0,
    lastUsedRowIndex: null,
    lastUsedColIndex: null,
    winningLine: null,
  });

  handleSquareClick = (_, col) => {
    let freeRowIndex = this.columnFreeRowIndex(col);
    if (typeof freeRowIndex !== 'number' || this.boardIsFull() || this.gameOver()) { return; }

    let { squares } = this.state;
    squares[freeRowIndex][col] = this.currentPlayerLabel();
    this.state.lastUsedRowIndex = freeRowIndex;
    this.state.lastUsedColIndex = col;


    this.setState(prevState => ({
      currentPlayerIndex: this.nextPlayer(prevState),
      winningLine: this.winningLine(),
    }));
  }

  columnFreeRowIndex = (colIndex) => {
    for (let rowIndex = this.props.rowsCount - 1; rowIndex >= 0; rowIndex--) {
      if (!this.state.squares[rowIndex][colIndex]) {
        return rowIndex;
      }
    }
  }

  gameOver = () => {
    const { winningLine } = this.state;
    if (winningLine) { return winningLine; }
  }

  winningLine = () => {
    if (typeof this.state.lastUsedRowIndex !== 'number') { return undefined; }

    let line = this.winByColumn() || this.winByRow() || this.winByMainDiag() || this.winBySecondaryDiag();
    if (line) { return line; }
  }

  winBySecondaryDiag = () => {
    const { lastUsedRowIndex, lastUsedColIndex, squares } = this.state;
    const { rowsCount, colsCount } = this.props;

    let row = lastUsedRowIndex - 3;
    let col = lastUsedColIndex + 3;
    while (row <= lastUsedRowIndex && col >= lastUsedColIndex) {
      if (row < 0 || row + 3 >= rowsCount || col >= colsCount || col - 3 < 0) {
        row++; col--;
        continue;
      }

      if (squares[row][col] === squares[row + 1][col - 1] &&
        squares[row][col] === squares[row + 2][col - 2] &&
        squares[row][col] === squares[row + 3][col - 3]) {
        return [[row, col], [row + 1, col - 1], [row + 2, col - 2], [row + 3, col - 3]];
      }
      row++; col--;
    }

    return false;
  }

  winByMainDiag = () => {
    const { lastUsedRowIndex, lastUsedColIndex, squares } = this.state;
    const { rowsCount, colsCount } = this.props;

    let row = lastUsedRowIndex - 3;
    let col = lastUsedColIndex - 3;
    while (row <= lastUsedRowIndex && col <= lastUsedColIndex) {
      if (row < 0 || row + 3 >= rowsCount || col < 0 || col + 3 >= colsCount) {
        row++; col++;
        continue;
      }

      if (squares[row][col] === squares[row + 1][col + 1] &&
        squares[row][col] === squares[row + 2][col + 2] &&
        squares[row][col] === squares[row + 3][col + 3]) {
        return [[row, col], [row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3]];
      }
      row++; col++;
    }

    return false;
  }

  winByRow = () => {
    const { lastUsedRowIndex, lastUsedColIndex, squares } = this.state;

    for (let col = lastUsedColIndex - 3; col <= lastUsedColIndex; col++) {
      if (squares[lastUsedRowIndex][col] === squares[lastUsedRowIndex][col + 1] &&
        squares[lastUsedRowIndex][col] === squares[lastUsedRowIndex][col + 2] &&
        squares[lastUsedRowIndex][col] === squares[lastUsedRowIndex][col + 3]) {
        return ([[lastUsedRowIndex, col], [lastUsedRowIndex, col + 1],
          [lastUsedRowIndex, col + 2], [lastUsedRowIndex, col + 3]]);
      }
    }

    return false;
  }

  winByColumn = () => {
    const { lastUsedRowIndex, lastUsedColIndex, squares } = this.state;
    const { rowsCount } = this.props;

    if (lastUsedRowIndex >= (rowsCount - 3)) { return false; }

    for (let i = 1; i < 4; i++) {
      if (squares[lastUsedRowIndex][lastUsedColIndex] !==
        squares[lastUsedRowIndex + i][lastUsedColIndex]) {
        return false;
      }
    }

    return ([[lastUsedRowIndex, lastUsedColIndex], [lastUsedRowIndex + 1, lastUsedColIndex],
      [lastUsedRowIndex + 2, lastUsedColIndex], [lastUsedRowIndex + 3, lastUsedColIndex]]);
  }

  cellClasses = (row, col) => {
    const { squares, winningLine } = this.state;
    const { players } = this.props;
    let classNames = [];

    if (squares[row][col] === players[0]) {
      classNames.push('player1');
    } else if (squares[row][col] === players[1]) {
      classNames.push('player2');
    }

    if (winningLine && winningLine.some(pair => pair[0] === row && pair[1] === col)) {
      classNames.push('winningCell')
    }

    return classNames;
  }

  render() {
    return this.drawBoard();
  }
}
