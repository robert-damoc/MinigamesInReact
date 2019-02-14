import Board from '../../../components/Board';

export default class Connect4Board extends Board {
  handleSquareClick = (i) => {
    console.log(i);
    console.log(i % 7);
    // const squares = this.state.squares.slice();

    // if (this.winningLine() || squares[i] || this.draw()) { return; }

    // squares[i] = this.currentPlayerLabel();

    // this.setState({
    //   squares: squares,
    //   xIsNext: !this.state.xIsNext,
    // });
  }

  gameOver = () => {

  }

  isWinningCell = () => {

  }

  render() {
    return this.drawBoard();
  }
}
