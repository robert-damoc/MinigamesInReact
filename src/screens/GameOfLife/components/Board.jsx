import Board from '../../../components/Board/';

import './Board.css'

export default class GameOfLifeBoard extends Board {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.setRandomCells();
  };

  setRandomCells = () => {
    // Set random population
  }

  cellClasses = (rowIndex, colIndex) => {
    if (this.state.squares[rowIndex][colIndex]) {
      return ['alive'];
    }
    return ['dead'];
  }

  getStatus = () => ''
  handleSquareClick = (rowIndex, colIndex) => {
    this.state.squares[rowIndex][colIndex] = !this.state.squares[rowIndex][colIndex];
    this.setState(_ => ({
      squares: this.state.squares,
    }));
  }
  gameOver = () => false

  render() {
    return this.drawBoard();
  }
}
