import Board from '../../../components/Board/';

export default class TicTacToeBoard extends Board {
  handleSquareClick = (i) => {
    const squares = this.state.squares.slice();

    if (this.winningLine() || squares[i] || this.boardIsFull()) { return; }

    squares[i] = this.currentPlayerLabel();

    this.setState(prevState => ({
      squares: squares,
      currentPlayerIndex: (prevState.currentPlayerIndex + 1) % this.props.players.length,
    }));
  }

  gameOver = () => {
    let line = this.winningLine();
    if (line) { return line; }
  }

  isWinningCell = (i) => {
    let line = this.gameOver();
    return line && line.indexOf(i) >= 0
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
