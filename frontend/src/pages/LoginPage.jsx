// import { toast } from 'react-toastify';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useLoginMutation } from '../slices/usersApiSlice';
// import { setCredentials } from '../slices/authSlice';
import FormControl from '../components/FormControl';
import FormField from '../components/FormField';
import BaseButton from '../components/BaseButton';

const LoginPage = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const [login, { isLoading }] = useLoginMutation();

  // const { userInfo } = useSelector((state) => state.auth);

  // const { search } = useLocation();
  // const sp = new URLSearchParams(search);
  // const redirect = sp.get('redirect') || '/';

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [userInfo, navigate, redirect]);

  return (
    <div>
      Login Form
      <div class='bg-[#f0f1f7] flex rounded-lg p-8 w-fit'>
        <form>
          <div className='items-center'>
            <div>
              <FormField label='Email'></FormField>
              <FormControl
                id='email'
                type='email'
                placeholder='Email'
              ></FormControl>
            </div>
            <div>
              <FormField label='Password'></FormField>
              <FormControl
                id='password'
                type='password'
                placeholder='Password'
              ></FormControl>
            </div>
            <div>
              <BaseButton buttonLabel='Login'></BaseButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
