// React modules
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Firebase modules
import {
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../firebase.config';

// Others
import { toast } from 'react-toastify';

// Components
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

function Category() {
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get a reference of the listings
        const listingsRef = collection(db, 'listings');

        // Create a query
        const q = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10)
        );

        // Execute the query
        const querySnap = await getDocs(q);

        // Loop over the query snapshot and update the state
        const listingsData = [];
        querySnap.forEach((doc) => {
          return listingsData.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listingsData);
        setLoading(false);
      } catch (error) {
        toast.error('Unable to fetch the listings from the server!');
        console.log(error);
      }
    };
    fetchListings();
  }, [params.categoryName]);

  return (
    <div className="m-5">
      <header className="mb-5">
        <p className="text-3xl font-extrabold">
          {params.categoryName === 'rent'
            ? 'Places for rent'
            : 'Places for sale'}
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <main>
          <ul>
            {listings.map((listing) => (
              <ListingItem
                key={listing.id}
                listing={listing.data}
                id={listing.id}
              />
            ))}
          </ul>
        </main>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
