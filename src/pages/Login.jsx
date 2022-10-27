import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';
import {
  MdEmail,
  MdPassword,
  MdRemoveRedEye,
  MdKeyboardArrowRight,
} from 'react-icons/md';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const formChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // const user = userCredential.user;
      toast.success('Logged In successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error('Bad user credentials!');
    }
  };

  return (
    <div className="m-4">
      <header>
        <p className="text-3xl font-bold my-4">Welcome Back!</p>
      </header>
      <form onSubmit={formSubmit} className="form-control">
        <div className="flex items-center border rounded-2xl h-12 my-2">
          <MdEmail size={30} className="pl-1" />
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full border-none outline outline-none bg-inherit mx-2"
            value={email}
            onChange={formChange}
          />
        </div>
        <div className="flex items-center border rounded-2xl h-12 my-2">
          <MdPassword size={30} className="pl-1" />
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Password"
            className="w-full border-none outline outline-none bg-inherit mx-2"
            value={password}
            onChange={formChange}
          />
          <MdRemoveRedEye
            size={30}
            className="pr-1 cursor-pointer"
            onClick={() => setShowPassword((prevState) => !prevState)}
          />
        </div>
        <Link
          to={'/password-reset'}
          className="flex justify-end text-sm text-green-600 font-bold"
        >
          Forgot Password
        </Link>
        <div className="flex items-center md:justify-start justify-between mt-20">
          <p className="text-lg font-bold md:mr-5">Login</p>
          <button className="rounded-full">
            <MdKeyboardArrowRight
              size={40}
              className="rounded-full bg-green-600 fill-white"
            />
          </button>
        </div>
      </form>
      <OAuth />
      <Link
        to={'/register'}
        className="flex justify-center text-sm text-green-600 font-bold mt-20"
      >
        Register Instead
      </Link>
    </div>
  );
}

export default Login;
