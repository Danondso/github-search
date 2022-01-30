import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, onClick, disabled }) {
  return (
    <button className="button" type="button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
