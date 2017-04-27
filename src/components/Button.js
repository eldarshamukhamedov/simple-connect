import React from 'react';
import classNames from 'classnames';
import { string, bool, func } from 'prop-types';

import './Button.css';

export const Button = ({ label, disabled, onClick }) => {
  return (
    <button
      className={classNames('button', { disabled })}
      onClick={event => !disabled && onClick(event)}
    >
      {label}
    </button>
  );
};
Button.propTypes = {
  label: string.isRequired,
  disabled: bool.isRequired,
  onClick: func.isRequired
};
Button.defaultProps = {
  disabled: false,
  onClick() {}
};
