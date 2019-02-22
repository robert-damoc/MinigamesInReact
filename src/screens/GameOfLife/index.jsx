import React from 'react';
import Board from './components/Board';

import './GameOfLife.css';

export default class GameOfLife extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            rowsCount={30}
            colsCount={50}
            players={[]}
            playAgainText={'RESTART'}
          />
        </div>
      </div>
    );
  }
}
