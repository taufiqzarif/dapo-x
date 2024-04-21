const ButtonLoader = ({ size = 8 }) => {
  const sizePx = `${size * 4}px`; // convert to tailwindcss size
  return (
    <div
      style={{
        width: sizePx,
        height: sizePx,
        borderWidth: '2px',
        borderColor: 'transparent',
        borderTopColor: 'white',
      }}
      className='animate-spin rounded-full border-solid'
    ></div>
  );
};

export default ButtonLoader;
