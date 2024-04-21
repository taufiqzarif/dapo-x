import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';

const Navbar = () => {
  const menuItems = [
    { name: 'Home', route: '/' },
    { name: 'About', route: '/about' },
    // Add more items as needed
  ];

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className='flex items-center justify-between flex-wrap bg-neutral-800 p-6'>
      <div className='flex items-center flex-shrink-0 text-white mr-6'>
        <span className='font-semibold text-xl tracking-tight'>Dapo 1291</span>
      </div>
      <div className='block lg:hidden'>
        <button className='flex items-center px-3 py-2 border rounded text-white border-teal-400 hover:text-white hover:border-white'>
          <svg
            className='fill-current h-3 w-3'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Menu</title>
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z' />
          </svg>
        </button>
      </div>
      <div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
        <div className='text-sm lg:flex-grow'>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.route}
              className='block mt-4 lg:inline-block lg:mt-0 text-neutral-200 hover:text-white mr-4'
            >
              {item.name}
            </Link>
          ))}
          {/* add logout */}
          {userInfo ? (
            <button
              onClick={handleLogout}
              className='block mt-4 lg:inline-block lg:mt-0 text-neutral-200 hover:text-white mr-4'
            >
              Logout
            </button>
          ) : (
            <Link
              to='/login'
              className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
