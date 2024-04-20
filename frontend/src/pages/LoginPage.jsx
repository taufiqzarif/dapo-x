import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import FormControl from '../components/FormControl';
import FormField from '../components/FormField';
import BaseButton from '../components/BaseButton';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormFilled = email.length > 0 && password.length > 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Login successful');
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      Login Form
      <div className='bg-[#f0f1f7] flex rounded-lg p-8 w-fit'>
        <form onSubmit={handleSubmit}>
          <div className='items-center'>
            <FormField label='Email'></FormField>
            <FormControl
              id='email'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormField label='Password'></FormField>
            <FormControl
              id='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <BaseButton
              buttonLabel='Login'
              type='submit'
              disabled={!isFormFilled}
              loading={isLoginLoading}
            />
            New User?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
