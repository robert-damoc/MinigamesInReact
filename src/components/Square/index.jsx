import React from 'react';

import './Square.css';

const Square = (props) => {
  const classes = () => {
    let classNames = 'square ';

    if (props.isWinningCell) {
      classNames += props.isWinningCell.join(' ');
    }

    return classNames;
  };

  return (
    <button
      className={classes()}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Square;
