import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';

import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

function OAuth() {
  const location = useLocation();
  const navigate = useNavigate();

  const onGoogleAuthClick = async () => {
    try {
      const auth = getAuth();
      // Create a Google auth provider instance
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Get a reference to the document
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        toast.success('Registered successfully.');
      }
      navigate('/');
      toast.success('Logged in successfully.');
    } catch (error) {
      toast.error('Could not authorize with Google.');
    }
  };

  return (
    <div className="flex items-center md:justify-start justify-between mt-5">
      <p className="text-lg font-bold md:mr-5">
        {location.pathname === '/login' ? 'Login' : 'Register'} with
      </p>
      <button onClick={onGoogleAuthClick} className="rounded-full">
        <FcGoogle size={45} />
      </button>
    </div>
  );
}

export default OAuth;
