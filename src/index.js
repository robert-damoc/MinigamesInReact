import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const calculateWinner = (squares) => {
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
      return squares[a];
    }
  }
  return null;
};

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
};

class Board extends React.Component {
  state = {
    squares: Array(9).fill(null),
    xIsNext: true,
  };

  renderSquare(i) {
    return (
    <Square
      value={this.state.squares[i]}
      onClick={() => this.handleSquareClick(i)}
    />);
  }

  currentPlayerLabel = () => {
    return this.state.xIsNext ? 'X' : 'O';
  };

  handleSquareClick = (i) => {
    const squares = this.state.squares.slice();

    if (calculateWinner(squares) || squares[i]) { return; }

    squares[i] = this.currentPlayerLabel();

    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  status = () => {
    const winner = calculateWinner(this.state.squares);
    if (winner) {
      return 'Winner: ' + winner;
    } else {
      return 'Next player: ' + this.currentPlayerLabel();
    }
  };

  render() {
    let status = this.status();

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
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
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
