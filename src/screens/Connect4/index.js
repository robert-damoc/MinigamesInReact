import React from 'react';
import Board from './components/Board';

import './Connect4.css';

export default class Connect4 extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            rows={6}
            cols={7}
            players={['R', 'B']}
          />
        </div>
      </div>
    );
  }
}
