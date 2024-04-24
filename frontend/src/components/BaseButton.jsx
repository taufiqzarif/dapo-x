import React from 'react';
import PropTypes from 'prop-types';
import ButtonLoader from './ButtonLoader';

const BaseButton = ({
  buttonLabel,
  id,
  type,
  loading,
  disabled,
  loaderSize = 8,
}) => {
  const buttonClasses = `bg-black text-white p-2 rounded-md w-40 h-10 flex justify-center items-center relative overflow-hidden ${
    loading
      ? 'hover:opacity-85'
      : disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'hover:opacity-85'
  }`;
  return (
    <button
      className={`${buttonClasses}`}
      id={id}
      type={type}
      disabled={disabled || loading}
    >
      {loading ? <ButtonLoader size={loaderSize} /> : buttonLabel}
    </button>
  );
};

BaseButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  id: PropTypes.string,
  type: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

BaseButton.defaultProps = {
  type: 'button',
  loading: false,
  disabled: false,
};

export default BaseButton;
