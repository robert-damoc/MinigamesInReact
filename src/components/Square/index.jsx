import React from 'react';

import './Square.scss';

const Square = ({ classNames = [], value, onClick }) => {
  const classes = `col ${classNames.join(' ')}`;
  const firstChange = 'first change here; with update';
  const secondChange = 'second change here';

  return (
    <div className={classes} onClick={onClick}>
      {value}
    </div>
  );
};

export default Square;
