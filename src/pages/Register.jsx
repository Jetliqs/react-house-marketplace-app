import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import OAuth from '../components/OAuth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

import { db } from '../firebase.config';

import {
  MdPerson,
  MdPassword,
  MdEmail,
  MdRemoveRedEye,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { toast } from 'react-toastify';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;

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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        timestamp: serverTimestamp(),
      });

      navigate('/');
    } catch (error) {
      toast.error(
        'Unable to register with provided credentials! Please try again.'
      );
    }
  };

  return (
    <div className="m-4">
      <header>
        <p className="text-3xl font-bold my-4">Welcome!</p>
      </header>
      <form onSubmit={formSubmit} className="form-control">
        <div className="flex items-center border rounded-2xl h-12 my-2">
          <MdPerson size={30} className="pl-1" />
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="w-full border-none outline outline-none bg-inherit mx-2"
            value={name}
            onChange={formChange}
          />
        </div>
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

        <div className="flex items-center md:justify-start justify-between mt-20">
          <p className="text-lg font-bold md:mr-5">Register</p>
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
        to={'/login'}
        className="flex justify-center text-sm text-green-600 font-bold mt-20"
      >
        Login Instead
      </Link>
    </div>
  );
}

export default Register;
