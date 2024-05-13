const FormControl = ({ id, type, placeholder, value, onChange }) => {
  return (
    <div>
      {/* <select id={id} placeholder={placeholder} value={value}></select>
      <textarea id={id} placeholder={placeholder} value={value}></textarea> */}
      <input
        className='border rounded-md py-1 px-2 mb-4 w-[100%]'
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default FormControl;
