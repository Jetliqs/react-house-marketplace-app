import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signOut, updateProfile, updateEmail } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { MdHome, MdArrowRight } from 'react-icons/md';

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    displayName: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const [changeStatus, setChangeStatus] = useState(false);

  const { displayName, email } = userData;

  const onLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Unable to log Out! Please try again.');
      console.log(error);
    }
  };

  const formChange = (e) => {
    e.preventDefault();
    setUserData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const useRef = doc(db, 'users', auth.currentUser.uid);

    try {
      if (auth.currentUser.displayName !== displayName) {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
        });
        await updateDoc(useRef, {
          name: displayName,
        });
        toast.success('Your name have been updated successfully!');
      }
      if (auth.currentUser.email !== email) {
        await updateEmail(auth.currentUser, email);
        await updateDoc(useRef, {
          email: email,
        });
        toast.success('Your email have been updated successfully!');
        await signOut(auth);
        toast.success('Please login again with the new email!');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, while updating your profile!');
    }
  };

  return (
    <div className="m-5">
      <header className="flex justify-between items-center">
        <p className="text-3xl font-extrabold">My Profile</p>
        <button
          onClick={onLogout}
          className="btn btn-success btn-xs cursor-pointer"
        >
          Logout
        </button>
      </header>
      <main className="mt-10">
        <div>
          <form onSubmit={formSubmit}>
            <div className="flex justify-between items-center">
              <h1 className="text-md ">Personal Details</h1>
              <button
                type="submit"
                onClick={() => setChangeStatus((prevState) => !prevState)}
                className="btn btn-success btn-xs"
              >
                {changeStatus ? 'Done' : 'Change'}
              </button>
            </div>
            <div className="mt-4 p-4 border rounded-xl">
              <input
                className="input input-ghost input-sm bg-slate-100 disabled:bg-inherit w-full mb-2 font-bold"
                type="text"
                placeholder="Username"
                id="displayName"
                value={displayName}
                onChange={formChange}
                disabled={changeStatus ? false : true}
              />
              <input
                className="input input-ghost input-sm bg-slate-100 disabled:bg-inherit w-full mb-2 font-bold"
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={formChange}
                disabled={changeStatus ? false : true}
              />
            </div>
          </form>
        </div>
        <Link
          to={'/create-listing'}
          className="flex justify-between items-center max-w-auto font-semibold mt-8 border rounded-xl hover:bg-slate-100"
        >
          <MdHome size={30} className="ml-4" />
          <p>Sell or rent your home</p>
          <MdArrowRight size={50} className="mr-1" />
        </Link>
      </main>
    </div>
  );
}

export default Profile;
