import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg';
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg';
import { ReactComponent as PersonOulineIcon } from '../assets/svg/personOutlineIcon.svg';

function OldNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <footer className="bg-base-300 fixed left-0 bottom-0 right-0 h-20">
      <nav className="w-full mt-3 overflow-hidden">
        <ul className="navbar justify-evenly">
          <li
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <ExploreIcon
              className={
                pathMatchRoute('/') ? 'fill-accent-focus' : 'fill-base-content'
              }
              width="30px"
              height="30px"
            />
            <p
              className={`text-lg ${
                pathMatchRoute('/') ? 'text-accent-focus' : 'text-base-content'
              }`}
            >
              Explore
            </p>
          </li>
          <li
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate('/offers')}
          >
            <OfferIcon
              className={
                pathMatchRoute('/offers')
                  ? 'fill-accent-focus'
                  : 'fill-base-content'
              }
              width="30px"
              height="30px"
            />
            <p
              className={`text-lg ${
                pathMatchRoute('/offers')
                  ? 'text-accent-focus'
                  : 'text-base-content'
              }`}
            >
              Offers
            </p>
          </li>
          <li
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate('/profile')}
          >
            <PersonOulineIcon
              className={
                pathMatchRoute('/profile')
                  ? 'fill-accent-focus'
                  : 'fill-base-content'
              }
              width="30px"
              height="30px"
            />
            <p
              className={`text-lg ${
                pathMatchRoute('/profile')
                  ? 'text-accent-focus'
                  : 'text-base-content'
              }`}
            >
              Profile
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default OldNavbar;
