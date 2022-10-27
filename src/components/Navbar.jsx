import { NavLink } from 'react-router-dom';
import {
  MdOutlineExplore,
  MdOutlineLocalOffer,
  MdOutlinePerson,
} from 'react-icons/md';

function Navbar() {
  return (
    <footer className="bg-base-300 fixed left-0 bottom-0 right-0 h-20">
      <nav className="w-full mt-3 overflow-hidden">
        <ul className="navbar justify-evenly">
          <li className="cursor-pointer">
            <NavLink to="/" end>
              {({ isActive }) => (
                <div className="flex flex-col items-center">
                  <MdOutlineExplore
                    size={30}
                    className={
                      isActive ? 'fill-green-700' : 'fill-base-content'
                    }
                  />
                  <p
                    className={`text-lg ${
                      isActive ? 'text-green-700' : 'text-base-content'
                    }`}
                  >
                    Explore
                  </p>
                </div>
              )}
            </NavLink>
          </li>
          <li className="cursor-pointer">
            <NavLink to="/offers">
              {({ isActive }) => (
                <div className="flex flex-col items-center">
                  <MdOutlineLocalOffer
                    size={30}
                    className={
                      isActive ? 'fill-green-700' : 'fill-base-content'
                    }
                    width="30px"
                    height="30px"
                  />
                  <p
                    className={`text-lg ${
                      isActive ? 'text-green-700' : 'text-base-content'
                    }`}
                  >
                    Offers
                  </p>
                </div>
              )}
            </NavLink>
          </li>
          <li className="cursor-pointer">
            <NavLink to="/profile">
              {({ isActive }) => (
                <div className="flex flex-col items-center">
                  <MdOutlinePerson
                    size={30}
                    className={
                      isActive ? 'fill-green-700' : 'fill-base-content'
                    }
                    width="30px"
                    height="30px"
                  />
                  <p
                    className={`text-lg ${
                      isActive ? 'text-green-700' : 'text-base-content'
                    }`}
                  >
                    Profile
                  </p>
                </div>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
