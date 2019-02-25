import React from 'react';
import Board from './components/Board';

import './TicTacToe.scss';

export default class TicTacToe extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            rowsCount={3}
            colsCount={3}
            players={['X', 'O']}
          />
        </div>
      </div>
    );
  }
}
