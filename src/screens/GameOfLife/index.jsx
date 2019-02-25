import React from 'react';
import Board from './components/Board';

import './GameOfLife.scss';

export default class GameOfLife extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            rowsCount={25}
            colsCount={40}
            players={[]}
          />
        </div>
      </div>
    );
  }
}
