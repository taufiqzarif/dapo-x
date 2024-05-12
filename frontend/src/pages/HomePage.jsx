import { useGetAllItemsQuery } from '../slices/menuItemsApiSlice';

const HomePage = () => {
  const googleAuth = () => {
    window.open('/api/users/auth/google', '_self');
  };

  const {
    data: { data: items } = {},
    isLoading,
    isSuccess,
  } = useGetAllItemsQuery();

  console.log(items);

  return (
    <>
      <div className=''>
        <button onClick={googleAuth}>Google Auth</button>
      </div>
      {/* {isLoading && <p>Loading...</p>} */}
      {!isLoading && isSuccess && (
        <div className='grid grid-cols-3 gap-4'>
          {items.map((item) => (
            <div key={item._id} className='bg-white p-4 rounded-lg shadow-md'>
              <h2 className='text-xl font-bold'>{item.name}</h2>
              <p className='text-sm text-gray-500'>{item.description}</p>
              <p className='text-lg font-bold text-gray-800'>${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
