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

  controlButtons = () => {
    return ([{
      classes: 'play-again',
      text: 'Play Again!',
      onClick: this.playAgain,
    }]);
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

  renderBoard = () => {
    const { squares } = this.state;

    return (
      <div>
        <div className="status">{this.getStatus()}</div>

        <div className="container">
          {squares.map((row, rowIndex) => {
            return (
              <div key={'row-' + rowIndex} className="row">
                {row.map((_, colIndex) => {
                  return this.renderSquare(rowIndex, colIndex, this.cellClasses(rowIndex, colIndex));
                })}
              </div>
            );
          })}
        </div>

        <div className="controlButtons container">
          <div className="row">
            {this.controlButtons().map((controlButton, index) => {
              return (
                <div className={controlButton.classes} key={'controlButton' + index}>
                  <button
                    type="button"
                    className="btn btn-outline-dark btn-sm"
                    onClick={controlButton.onClick}
                  >
                    {controlButton.text}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  };

  render() {
    return this.renderBoard();
  };
}
