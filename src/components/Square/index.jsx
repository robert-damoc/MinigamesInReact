import React from 'react';

import './Square.scss';

const Square = ({ classNames = [], value, onClick }) => {
  const classes = `col ${classNames.join(' ')}`;

  return (
    <div className={classes} onClick={onClick}>
      {value}
    </div>
  );
};

export default Square;
