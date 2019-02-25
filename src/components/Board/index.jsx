import React, { Component } from 'react';
import Square from '../Square';

import './Board.scss';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
  };

  initState = () => ({
    squares: this.initSquares(),
    currentPlayerIndex: 0,
  });

  initSquares = (defaultValue = null) => {
    return Array(this.props.rowsCount).fill()
                                      .map(_ => Array(this.props.colsCount).fill(defaultValue));
  }

  renderSquare(row, col, classNames) {
    return (
      <Square
        key={col + row * this.props.colsCount}
        value={this.state.squares[row][col]}
        classNames={classNames}
        onClick={() => this.handleSquareClick(row, col)}
      />
    );
  };

  currentPlayerLabel = () => {
    return this.props.players[this.state.currentPlayerIndex];
  };

  nextPlayer = (prevState) => {
    return (prevState.currentPlayerIndex + 1) % this.props.players.length;
  }

  prevPlayer = () => {
    let index = this.state.currentPlayerIndex - 1;
    let playersCount = this.props.players.length;

    index = ((index % playersCount) + playersCount) % playersCount;
    return this.props.players[index];
  }

  playAgain = () => {
    this.setState(this.initState());
  };

  boardIsFull = () => {
    const { squares } = this.state;
    return squares.every(row => row.every(square => !!square));
  }

  getStatus = () => {
    if (this.boardIsFull()) {
      return 'Tie!';
    } else if (this.gameOver()) {
      return 'Winner: ' + this.prevPlayer();
    } else {
      return 'Next Player: ' + this.currentPlayerLabel();
    }
  }

  cellClasses = () => []

  drawBoard = () => {
    const { squares } = this.state;
    return (
      <div>
        <div className="status">{this.getStatus()}</div>
        {squares.map((row, rowIndex) => {
          return (
            <div key={'row-' + rowIndex} className="board-row">
              {row.map((_, colIndex) => {
                return this.renderSquare(rowIndex, colIndex, this.cellClasses(rowIndex, colIndex));
              })}
            </div>
          );
        })}
        <div className="play-again">
          <button onClick={this.playAgain}>
            {this.props.playAgainText || 'Play Again!'}
          </button>
        </div>
      </div>
    )
  };

  render() {
    return this.drawBoard();
  };
}
