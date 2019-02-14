import React from 'react';
import Square from '../../../components/Square';

export default class TicTacToeBoard extends React.Component {
  static initState = () => ({
    squares: Array(9).fill(null),
    xIsNext: true,
  });

  state = TicTacToeBoard.initState();

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
  };

  handleSquareClick = (i) => {
    const squares = this.state.squares.slice();

    if (this.winningLine() || squares[i] || this.draw()) { return; }

    squares[i] = this.currentPlayerLabel();

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  playAgain = () => {
    this.setState(TicTacToeBoard.initState());
  };

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

    return null;
  };

  draw = () => {
    return this.state.squares.every((square) => !!square);
  }

  render() {
    let line, status;

    if (this.draw()) {
      status = 'Draw';
    } else {
      line = this.winningLine()
      if (line) {
        status = 'Winner: ' + this.state.squares[line[0]];
      } else {
        status = 'Next player: ' + this.currentPlayerLabel();
      }
    }

    return (
      <div>
        <div className="status">{status}</div>
        {[...Array(3)].map((_, row) => {
          return <div key={row} className="board-row">
            {[...Array(3)].map((_, col) => {
              let index = col + row * 3;
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
