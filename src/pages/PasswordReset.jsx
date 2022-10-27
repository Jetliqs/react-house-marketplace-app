import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { MdEmail, MdKeyboardArrowRight } from 'react-icons/md';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const formChange = (e) => {
    setEmail(e.target.value);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Email was sent. Please check you inbox.');
      navigate('/login');
    } catch (error) {
      toast.error('Could not send verification email. Please try again later!');
    }
  };

  return (
    <div className="m-4">
      <header>
        <p className="text-3xl font-bold my-4">Forgot your Password ?</p>
        <p className="text-md font-bold my-4">
          Enter your email address to reset it right now :
        </p>
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
        <div className="flex items-center md:justify-start justify-between mt-20">
          <p className="text-lg font-bold md:mr-5">Send Reset Link</p>
          <button className="rounded-full">
            <MdKeyboardArrowRight
              size={40}
              className="rounded-full bg-green-600 fill-white"
            />
          </button>
        </div>
      </form>
      <Link
        to={'/login'}
        className="flex justify-center text-sm text-green-600 font-bold mt-20"
      >
        Login Instead
      </Link>
    </div>
  );
}

export default PasswordReset;
