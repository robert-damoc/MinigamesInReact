import React, { Component } from 'react';
import Square from '../Square';

import './Board.css';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
  };

  initState = () => ({
    squares: Array(this.props.rows * this.props.cols).fill(null),
    currentPlayerIndex: 0,
  });

  renderSquare(i, isWinningCell) {
    return (
      <Square
        key={i}
        value={this.state.squares[i]}
        isWinningCell={isWinningCell}
        onClick={() => this.handleSquareClick(i)}
      />
    );
  };

  currentPlayerLabel = () => {
    return this.props.players[this.state.currentPlayerIndex];
  };

  nextPlayer = (prevState) => {
    return (prevState.currentPlayerIndex + 1) % this.props.players.length;
  }

  winnerLabel = () => {
    let index = this.state.currentPlayerIndex - 1;
    let playersCount = this.props.players.length;

    index = ((index % playersCount) + playersCount) % playersCount;
    return this.props.players[index];
  }

  playAgain = () => {
    this.setState(this.initState());
  };

  boardIsFull = () => {
    return this.state.squares.every((square) => !!square);
  }

  getStatus = () => {
    if (this.boardIsFull()) {
      return 'Tie!';
    } else if (this.gameOver()) {
      return 'Winner: ' + this.winnerLabel();
    } else {
      return 'Next Player: ' + this.currentPlayerLabel();
    }
  }

  cellClasses = () => []

  drawBoard = () => {
    return (
      <div>
        <div className="status">{this.getStatus()}</div>
        {[...Array(this.props.rows)].map((_, row) => {
          return <div key={row} className="board-row">
            {[...Array(this.props.cols)].map((_, col) => {
              let index = col + row * this.props.cols;
              return this.renderSquare(index, this.cellClasses(index));
            })}
          </div>
        })}

        <div className="play-again">
          <button onClick={this.playAgain}>
            Play Again!
          </button>
        </div>
      </div>
    )
  };

  render() {
    return this.drawBoard();
  };
}
