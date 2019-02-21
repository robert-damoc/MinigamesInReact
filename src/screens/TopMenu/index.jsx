import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './TopMenu.css'

class TopMenu extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/">Home</Link>
        <Link to="/tic-tac-toe">TicTacToe</Link>
        <Link to="/connect4">Connect4</Link>
        <Link to="/game-of-life">Game of Life</Link>
      </div>
    );
  }
}

export default TopMenu;
