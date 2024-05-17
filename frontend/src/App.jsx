import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useCheckUserValidityQuery } from './slices/usersApiSlice';
import { useDispatch } from 'react-redux';
import { logout } from './slices/authSlice';

const App = () => {
  const dispatch = useDispatch();

  const {
    data: user,
    isSuccess,
    isLoading,
    isError,
  } = useCheckUserValidityQuery();

  useEffect(() => {
    if (!isLoading && isSuccess && user) {
      console.log('User is valid');
    } else if (!isLoading && isError && !user) {
      console.log('User is not valid');
      dispatch(logout());
    }
    console.log('User:', user);
  }, [user]);

  return (
    <>
      <Navbar />
      <main className='py-3'>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
