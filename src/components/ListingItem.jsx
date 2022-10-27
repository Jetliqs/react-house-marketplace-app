import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdBathtub, MdBedroomParent, MdDelete } from 'react-icons/md';

function ListingItem({ listing, id, onDelete }) {
  console.log(listing);
  return (
    <>
      <li className="flex justify-between items-center relative">
        <Link to={`/category/${listing.type}/${id}`} className="contents">
          <img
            src={listing.imageUrls[1]}
            alt={listing.name}
            className="w-3/12 h-24 rounded-xl object-cover"
          />
          <div className="w-2/3">
            <p className="mb-0 opacity-80 font-semibold text-sm">
              {listing.location}
            </p>
            <p className="m-0 text-xl font-bold">{listing.name}</p>
            <p className="text-xl font-bold text-green-500">
              $
              {listing.offer
                ? listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              {listing.type === 'rent' && ' / Month'}
            </p>
            <div className="flex justify-between max-w-[275px]">
              <MdBedroomParent size={22} />
              <p>
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Bedrooms`
                  : '1 Bedroom'}
              </p>
              <MdBathtub size={22} />
              <p>
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms`
                  : '1 Bathroom'}
              </p>
            </div>
          </div>
        </Link>
        {onDelete && (
          <MdDelete
            className="cursor-pointer"
            size={20}
            onClick={() => onDelete(listing.id, listing.name)}
          />
        )}
      </li>
    </>
  );
}

ListingItem.defaultProps = {};

export default ListingItem;
