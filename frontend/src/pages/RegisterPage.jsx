import { useEffect, useState } from 'react';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import FormControl from '../components/FormControl';
import FormField from '../components/FormField';
import BaseButton from '../components/BaseButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!matchPassword()) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      const res = await register({ name, email, phone, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Register successful');
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || 'Register failed');
    }
  };

  const matchPassword = () => {
    return password === confirmPassword;
  };

  return (
    <>
      <div className='flex justify-center items-center'>
        <div className='bg-[#f0f1f7] rounded-lg p-8 w-[30%] shadow-lg'>
          <p className='text-2xl font-bold mb-4 pb-14 text-[#912F40]'>
            Let's get you started !
          </p>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-2 gap-4'>
              <div className='col-span-2'>
                <FormField label='Name'></FormField>
                <FormControl
                  id='name'
                  type='text'
                  placeholder='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <FormField label='Email'></FormField>
                <FormControl
                  id='email'
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <FormField label='Phone Number'></FormField>
                <FormControl
                  id='phoneNumber'
                  type='text'
                  placeholder='Phone Number'
                  value={phone}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div>
                <FormField label='Password'></FormField>
                <FormControl
                  id='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <FormField label='Confirm Password'></FormField>
                <FormControl
                  id='confirmPassword'
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div className='flex justify-end'>
              <BaseButton
                buttonLabel='Sign Up'
                type='submit'
                loading={isRegisterLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
