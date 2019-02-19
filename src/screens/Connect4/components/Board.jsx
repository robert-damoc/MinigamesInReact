import Board from '../../../components/Board/';

import './Board.css'

export default class Connect4Board extends Board {
  initState = () => ({
    squares: Array(this.props.rows * this.props.cols).fill(null),
    currentPlayerIndex: 0,
    lastUsedIndex: null,
  });

  handleSquareClick = (i) => {
    // if (this.gameOver()) { return; }
    // console.log(this.gameOver());

    let freeIndex = this.columnFreeIndex(i % this.props.cols);
    if (typeof freeIndex !== 'number' || this.boardIsFull()) { return; }

    let { squares } = this.state;
    squares[freeIndex] = this.currentPlayerLabel();

    this.setState(prevState => ({
      squares: squares,
      currentPlayerIndex: this.nextPlayer(prevState),
      lastUsedIndex: freeIndex,
    }));
  }

  columnFreeIndex = (colIndex) => {
    let i, found = false;
    for (let rowIndex = this.props.rows - 1; rowIndex >= 0; rowIndex--) {
      i = rowIndex * this.props.cols + colIndex;
      if (!this.state.squares[i]) {
        found = true
        break;
      }
    }
    if (found) { return i; }
  }

  gameOver = () => {
    return this.boardIsFull() || this.winByColumn() || this.winByRow() || this.winByDiag();
  }

  winByMainDiag = (topRow, bottomRow, leftCol, rightCol) => {
    if (bottomRow - topRow < 3 || rightCol - leftCol < 3) { return false; }

    let { squares } = this.state;
    for (let row = topRow; row < topRow + 3; row++) {

    }
  }

  winByDiag = () => {
    const { lastUsedIndex } = this.state;

    if (!lastUsedIndex) { return false; }

    const { cols, rows } = this.props;
    const currentCol = lastUsedIndex % cols;
    const currentRow = Math.floor(lastUsedIndex / cols);

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
    const { lastUsedIndex, squares } = this.state;

    if (!lastUsedIndex) { return false; }

    const { cols } = this.props;
    const startOfRowIndex = lastUsedIndex - (lastUsedIndex % cols);
    const endOfRowIndex = lastUsedIndex + cols - 1 - (lastUsedIndex % cols);

    const lowerBound = Math.max(lastUsedIndex - 3, startOfRowIndex);
    const upperBound = Math.min(lastUsedIndex + 3, endOfRowIndex);
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
    const { lastUsedIndex, squares } = this.state;
    const { cols, rows } = this.props;

    if (!lastUsedIndex || lastUsedIndex > (cols * (rows - 3) - 1)) { return false; }

    for (let i = 0; i < 3; i++) {
      if (squares[lastUsedIndex + i * cols] !== squares[lastUsedIndex + (i + 1) * cols]) {
        return false;
      }
    }

    return true;
  }

  cellClasses = (i) => {
    const { squares } = this.state;
    const { players } = this.props;
    let classNames = [];

    if (squares[i] === players[0]) {
      classNames.push('player1');
    } else if (squares[i] === players[1]) {
      classNames.push('player2');
    }

    return classNames;
  }

  render() {
    return this.drawBoard();
  }
}
