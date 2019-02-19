import Board from '../../../components/Board/';

import './Board.css'

export default class TicTacToeBoard extends Board {
  initState = () => ({
    squares: Array(this.props.rows * this.props.cols).fill(null),
    currentPlayerIndex: 0,
    line: null,
  });

  handleSquareClick = (i) => {
    let { squares } = this.state;

    if (this.gameOver() || squares[i] || this.boardIsFull()) { return; }
    squares[i] = this.currentPlayerLabel();

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

  cellClasses = (i) => {
    let line = this.gameOver();
    if (line && line.indexOf(i) >= 0) {
      return ['marked'];
    }
  }

  winningLine = () => {
    const { squares } = this.state;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return lines[i];
      }
    }
  };

  render() {
    return this.drawBoard();
  }
}
