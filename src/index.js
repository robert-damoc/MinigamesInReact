import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css';
import './index.scss'

import TopMenu from './screens/TopMenu/'
import Home from './screens/Home'
import TicTacToe from './screens/TicTacToe/'
import Connect4 from './screens/Connect4/'
import GameOfLife from './screens/GameOfLife/'
import NotFound from './screens/NotFound'

const routing = (
  <Router>
    <div>
      <TopMenu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path='/tic-tac-toe' component={TicTacToe} />
        <Route path='/connect4' component={Connect4} />
        <Route path='/game-of-life' component={GameOfLife} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'))
