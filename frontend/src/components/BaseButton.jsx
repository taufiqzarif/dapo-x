import React from 'react';

const BaseButton = ({ buttonLabel, id, type }) => {
  return (
    <div>
      <button
        class='bg-black text-white p-2 rounded-md min-w-40'
        id={id}
        type={type}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default BaseButton;
