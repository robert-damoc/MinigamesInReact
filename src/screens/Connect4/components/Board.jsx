import Board from '../../../components/Board/';

import './Board.css'

export default class Connect4Board extends Board {
  initState = () => ({
    squares: Array(this.props.rowsCount).fill().map(() => Array(this.props.colsCount).fill(null)),
    currentPlayerIndex: 0,
    lastUsedRowIndex: null,
    lastUsedColIndex: null,
  });

  handleSquareClick = (_, col) => {
    let freeRowIndex = this.columnFreeRowIndex(col);
    if (typeof freeRowIndex !== 'number' || this.boardIsFull()) { return; }

    let { squares } = this.state;
    squares[freeRowIndex][col] = this.currentPlayerLabel();

    this.setState(prevState => ({
      squares: squares,
      currentPlayerIndex: this.nextPlayer(prevState),
      lastUsedRowIndex: freeRowIndex,
      lastUsedColIndex: col,
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
    // return this.boardIsFull() || this.winByColumn() || this.winByRow() || this.winByDiag();
  }

  winByMainDiag = (topRow, bottomRow, leftCol, rightCol) => {
    if (bottomRow - topRow < 3 || rightCol - leftCol < 3) { return false; }

    let { squares } = this.state;
    for (let row = topRow; row < topRow + 3; row++) {

    }
  }

  winByDiag = () => {
    const { lastUsedRowIndex } = this.state;

    if (!lastUsedRowIndex) { return false; }

    const { cols, rows } = this.props;
    const currentCol = lastUsedRowIndex % cols;
    const currentRow = Math.floor(lastUsedRowIndex / cols);

    const lowerBoundCol = Math.max(currentCol - 3, 0);
    const upperBoundCol = Math.min(currentCol + 3, cols - 1);
    const lowerBoundRow = Math.max(currentRow - 3, 0);
    const upperBoundRow = Math.min(currentRow + 3, rows - 1);

    // Check Main Diagonal
    let topRow = currentRow - 3;
    let leftCol = currentCol - 3;
    while (topRow < lowerBoundRow || leftCol < lowerBoundCol) { leftCol++; topRow++; }

    let bottomRow = currentRow + 3;
    let rightCol = currentCol + 3;
    while (bottomRow > upperBoundRow || rightCol > upperBoundCol) { rightCol--; bottomRow--; }

    if (this.winByMainDiag(topRow, bottomRow, leftCol, rightCol)) { return true; }

    // Check Secondary Diagonal


    return false;
  }

  winByRow = () => {
    const { lastUsedRowIndex, squares } = this.state;

    if (!lastUsedRowIndex) { return false; }

    const { cols } = this.props;
    const startOfRowIndex = lastUsedRowIndex - (lastUsedRowIndex % cols);
    const endOfRowIndex = lastUsedRowIndex + cols - 1 - (lastUsedRowIndex % cols);

    const lowerBound = Math.max(lastUsedRowIndex - 3, startOfRowIndex);
    const upperBound = Math.min(lastUsedRowIndex + 3, endOfRowIndex);
    for (let i = lowerBound; i <= upperBound - 3; i++) {
      if (squares[i] === squares[i + 1] &&
        squares[i] === squares[i + 2] &&
        squares[i] === squares[i + 3]) {
        return true;
      }
    }

    return false;
  }

  winByColumn = () => {
    const { lastUsedRowIndex, squares } = this.state;
    const { cols, rows } = this.props;

    if (!lastUsedRowIndex || lastUsedRowIndex > (cols * (rows - 3) - 1)) { return false; }

    for (let i = 0; i < 3; i++) {
      if (squares[lastUsedRowIndex + i * cols] !== squares[lastUsedRowIndex + (i + 1) * cols]) {
        return false;
      }
    }

    return true;
  }

  cellClasses = (row, col) => {
    const { squares } = this.state;
    const { players } = this.props;
    let classNames = [];

    if (squares[row][col] === players[0]) {
      classNames.push('player1');
    } else if (squares[row][col] === players[1]) {
      classNames.push('player2');
    }

    return classNames;
  }

  render() {
    return this.drawBoard();
  }
}
