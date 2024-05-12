import React from 'react';

const FormField = ({ label }) => {
  return (
    <div className='mb-2'>
      <label className='font-bold mr-2'>{label}</label>
    </div>
  );
};

export default FormField;
