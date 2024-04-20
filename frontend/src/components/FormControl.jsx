import { useState } from 'react';

const FormControl = ({ id, type, placeholder }) => {
  const [value, setValue] = useState('');

  return (
    <div>
      {/* <select id={id} placeholder={placeholder} value={value}></select>
      <textarea id={id} placeholder={placeholder} value={value}></textarea> */}
      <input
        class='border rounded-md py-1 px-2 mb-4'
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
    </div>
  );
};

export default FormControl;
