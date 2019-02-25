import Board from '../../../components/Board/';
import ExamplePlacement from './Examples';

import './Board.scss'

export default class GameOfLifeBoard extends Board {
  constructor(props) {
    super(props);
    this.state = this.initState();
  };

  controlButtons = () => {
    return ([
      {
        classes: 'start-game',
        text: 'Start',
        onClick: this.startGame,
      }, {
        classes: 'pause-game',
        text: 'Pause',
        onClick: this.pauseGame,
      }, {
        classes: 'clear',
        text: 'Clear',
        onClick: this.clearBoard,
      }, {
        classes: 'set-random-cells',
        text: 'Place Random Cells',
        onClick: this.setRandomCells,
      }, {
        classes: 'examples',
        text: 'Example',
        onClick: this.examplePlacement,
      },
    ]);
  }

  initState = () => {
    if (this.state.interval) { clearInterval(this.state.interval); }

    let squares = this.initSquares(false);

    return ({
      squares: squares,
      currentPlayerIndex: 0,
      interval: null,
    })
  }

  setRandomCells = () => {
    let { squares } = this.state;
    const { colsCount, rowsCount } = this.props;

    for (let i = 0; i < 10; i++) {
      squares[this.getRandomInt(rowsCount)][this.getRandomInt(colsCount)] = true;
    }

    this.setState(_ => ({ squares: squares }));
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }

  cellClasses = (rowIndex, colIndex) => {
    if (this.state.squares[rowIndex][colIndex]) {
      return ['alive'];
    }
    return ['dead'];
  }

  getStatus = () => {
    let aliveCells = this.state.squares.reduce((acc, row) => acc + row.filter(cell => cell).length, 0);
    return 'Cells Alive: ' + aliveCells;
  }

  handleSquareClick = (rowIndex, colIndex) => {
    this.state.squares[rowIndex][colIndex] = !this.state.squares[rowIndex][colIndex];
    this.setState(_ => ({ squares: this.state.squares }));
  }

  gameOver = () => false

  startGame = () => {
    let interval = setInterval(() => {
      const { rowsCount, colsCount } = this.props;
      const { squares } = this.state;

      let nextSquares = squares.map(arr => arr.slice());

      for (let row = 0; row < rowsCount; row++) {
        for (let col = 0; col < colsCount; col++) {
          let nCount = this.neighboursCount(row, col);

          if (squares[row][col]) {
            if (nCount < 2 || nCount > 3) {
              nextSquares[row][col] = false;
            } else {
              nextSquares[row][col] = true;
            }
          } else if (nCount === 3) {
            nextSquares[row][col] = true;
          } else {
            nextSquares[row][col] = false;
          }
        }
      }

      if (JSON.stringify(squares) === JSON.stringify(nextSquares)) {
        setTimeout(_ => {
          clearInterval(interval);
        }, 5000);
      }

      this.setState(_ => ({ squares: nextSquares }));
    }, 50);

    this.setState(_ => ({ interval: interval }));
  }

  pauseGame = () => {
    if (this.state.interval) {
      clearInterval(this.state.interval);
      this.setState(_ => ({ interval: null }));
    }
  }

  clearBoard = () => {
    if (this.state.interval) { clearInterval(this.state.interval); }

    this.setState(_ => ({
      squares: this.initSquares(false),
      interval: null,
    }))
  }

  neighboursCount = (row, col) => {
    let nCount = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) { continue; }
        if (row + i < 0 || row + i >= this.props.rowsCount) { continue; }
        if (this.state.squares[row + i][col + j]) { nCount++; }
      }
    }

    return nCount;
  }

  examplePlacement = () => {
    this.setState(_ => ({ squares: ExamplePlacement.glidersSpawner(this.props, this.state) }));
  }

  render() {
    return this.renderBoard();
  }
}
