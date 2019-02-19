import React from 'react';

import './Square.css';

const Square = ({ classNames = [], value, onClick }) => {
  const classes = `square ${classNames.join(' ')}`;

  return (
    <button
      className={classes}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
