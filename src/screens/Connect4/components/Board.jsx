import React, { Component } from 'react';
import Square from '../../../components/Square';

export default class Connect4Board extends Component {
  static initState = () => ({
    squares: Array(42).fill(null),
    xIsNext: true,
  });

  state = Connect4Board.initState();

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

  renderSquare(i, isWinningCell) {
    return (
      <Square
        key={i}
        value={this.state.squares[i]}
        isWinningCell={isWinningCell}
        onClick={() => this.handleSquareClick(i)}
      />
    );
  }

  currentPlayerLabel = () => {
    return this.state.xIsNext ? 'X' : 'O';
  }

  draw = () => {
    return this.state.squares.every((square) => !!square);
  }

  render() {
    let line = null, status = 'Next player: ' + this.currentPlayerLabel();;

    return (
      <div>
        <div className="status">{status}</div>
        {[...Array(6)].map((_, row) => {
          return <div key={row} className="board-row">
            {[...Array(7)].map((_, col) => {
              let index = col + row * 7;
              let isWinningCell = line && line.indexOf(index) >= 0;
              return this.renderSquare(index, isWinningCell);
            })}
          </div>
        })}

        <div className="play-again">
          <button onClick={this.playAgain}>
            Play Again!
          </button>
        </div>
      </div>
    );
  }
}
