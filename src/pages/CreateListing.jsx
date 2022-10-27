import { useState, useEffect } from 'react';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const initialFormState = {
  type: 'rent',
  name: '',
  bedrooms: 1,
  bathrooms: 1,
  parking: false,
  furnished: false,
  address: '',
  offer: false,
  regularPrice: 0,
  discountedPrice: 0,
  images: {},
  latitude: 0,
  longitude: 0,
};

function CreateListing() {
  const [formData, setFormData] = useState(initialFormState);
  const [geolocalisationEnabled, setGeolocalisationEnabled] = useState(true);
  const { loggedIn, checkingStatus, currentUser } = useAuthStatus();

  if (checkingStatus) {
    return <Spinner />;
  } else {
    setFormData({ ...initialFormState, userRef: currentUser.uid });
  }

  return loggedIn && <div>Create</div>;
}

export default CreateListing;
