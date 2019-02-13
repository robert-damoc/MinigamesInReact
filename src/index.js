import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const winningLine = (squares) => {
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

const Square = (props) => {
  return (
    <button className={'square' + (props.isWinCondition ? ' marked' : '')}
            onClick={props.onClick}>
      {props.value}
    </button>
  );
};

class Board extends React.Component {
  static initState = () => ({
    squares: Array(9).fill(null),
    xIsNext: true,
  });

  state = Board.initState();

  renderSquare(i, isWinCondition) {
    return (
      <Square key={i}
              value={this.state.squares[i]}
              isWinCondition={isWinCondition}
              onClick={() => this.handleSquareClick(i)} />
    );
  }

  currentPlayerLabel = () => {
    return this.state.xIsNext ? 'X' : 'O';
  };

  handleSquareClick = (i) => {
    const squares = this.state.squares.slice();

    if (winningLine(squares) || squares[i]) { return; }

    squares[i] = this.currentPlayerLabel();

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  playAgain = () => {
    this.setState(Board.initState());
  };

  render() {
    const line = winningLine(this.state.squares);
    let status;
    if (line) {
      status = 'Winner: ' + this.state.squares[line[0]];
    } else {
      status = 'Next player: ' + this.currentPlayerLabel();
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0, line && line.indexOf(0) >= 0)}
          {this.renderSquare(1, line && line.indexOf(1) >= 0)}
          {this.renderSquare(2, line && line.indexOf(2) >= 0)}
        </div>
        <div className="board-row">
          {this.renderSquare(3, line && line.indexOf(3) >= 0)}
          {this.renderSquare(4, line && line.indexOf(4) >= 0)}
          {this.renderSquare(5, line && line.indexOf(5) >= 0)}
        </div>
        <div className="board-row">
          {this.renderSquare(6, line && line.indexOf(6) >= 0)}
          {this.renderSquare(7, line && line.indexOf(7) >= 0)}
          {this.renderSquare(8, line && line.indexOf(8) >= 0)}
        </div>

        <div className="play-again">
          <button onClick={this.playAgain}>
            Play Again!
          </button>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
