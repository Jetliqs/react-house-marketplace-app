import { Link } from 'react-router-dom';
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';

function Explore() {
  return (
    <div className="m-5">
      <header className="mb-5">
        <p className="text-3xl font-extrabold">Explore</p>
      </header>
      <main>
        {/* //TODO Slider */}
        <p className="font-bold mb-5">Categories</p>
        <div className="grid grid-cols-2 gap-6">
          <Link to={'/category/rent'} className="h-3/6 justify-self-center">
            <img
              src={rentCategoryImage}
              alt="rent"
              className="h-full w-full rounded-2xl"
            />
            <p className="m-2 font-bold">Places for rent</p>
          </Link>
          <Link to={'/category/sale'} className="h-3/6 justify-self-center">
            <img
              src={sellCategoryImage}
              alt="sell"
              className="h-full w-full rounded-2xl"
            />
            <p className="m-2 font-bold">Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
