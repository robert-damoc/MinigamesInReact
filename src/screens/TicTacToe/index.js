import React from 'react';
import Board from './components/Board';

import './TicTacToe.css';

export default class TicTacToe extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            rows={3}
            cols={3}
            players={['X', 'O']}
          />
        </div>
      </div>
    );
  }
}
