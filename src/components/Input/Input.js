import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

function Input({
  placeholder,
  onChange,
  disabled,
}) {
  return (
    <input
      className="input"
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  disabled: false,
  onChange: undefined,
};

export default Input;
