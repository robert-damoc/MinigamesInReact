import Board from '../../../components/Board/';

import './Board.css'

export default class TicTacToeBoard extends Board {
  initState = () => ({
    squares: Array(this.props.rowsCount).fill().map(() => Array(this.props.colsCount).fill(null)),
    currentPlayerIndex: 0,
    line: null,
  });

  handleSquareClick = (row, col) => {
    let { squares } = this.state;

    if (this.gameOver() || squares[row][col] || this.boardIsFull()) { return; }
    squares[row][col] = this.currentPlayerLabel();

    this.setState(prevState => ({
      squares: squares,
      currentPlayerIndex: this.nextPlayer(prevState),
      line: this.winningLine(),
    }));
  }

  gameOver = () => {
    const { line } = this.state;
    if (line) { return line; }
  }

  cellClasses = (row, col) => {
    let line = this.gameOver();
    if (line && line.some(pair => pair[0] === row && pair[1] === col)) {
      return ['marked'];
    }
  }

  winningLine = () => {
    const { squares } = this.state;

    for (let i = 0; i < squares.length; i++) {
      if (squares[i][0] && squares[i][0] === squares[i][1] && squares[i][0] === squares[i][2]) {
        return [[i, 0], [i, 1], [i, 2]];
      }
    }

    for (let j = 0; j < squares.length; j++) {
      if (squares[0][j] && squares[0][j] === squares[1][j] && squares[0][j] === squares[2][j]) {
        return [[0, j], [1, j], [2, j]];
      }
    }

    if (squares[0][0] && squares[0][0] === squares[1][1] && squares[0][0] === squares[2][2]) {
      return [[0, 0], [1, 1], [2, 2]];
    }

    if (squares[0][2] && squares[0][2] === squares[1][1] && squares[0][2] === squares[2][0]) {
      return [[0, 2], [1, 1], [2, 0]];
    }
  };

  render() {
    return this.drawBoard();
  }
}
