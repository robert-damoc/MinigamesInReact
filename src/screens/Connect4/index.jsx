import React from 'react';
import Board from './components/Board';

import './Connect4.scss';

export default class Connect4 extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            rowsCount={6}
            colsCount={7}
            players={['R', 'G']}
          />
        </div>
      </div>
    );
  }
}
