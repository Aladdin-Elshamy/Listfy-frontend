import { NavLink, useLocation } from "react-router-dom";
import Button from "./ui/Button";

const Navbar = () => {
  const { pathname } = useLocation()
  const storageKey = "loggedInUser"
  const userDataString = localStorage.getItem(storageKey)
  const userData = userDataString ? JSON.parse(userDataString) : null
  function onLogout(){
    localStorage.removeItem(storageKey)
    location.replace(pathname)
  }
  return (
    <nav className="mt-7 mb-20 rounded-md text-gray-800">
      <ul className="flex items-center justify-between">
        <li className="duration-200 font-semibold text-lg hover:text-gray-400">
          <NavLink to="/">Home</NavLink>
        </li>
        <div className="flex items-center space-x-4">
          { userData ? (
            <>
              <li className="duration-200 font-semibold text-md hover:text-gray-400">
              <NavLink to="/todos">Todos</NavLink>
              </li>
              <li className="duration-200 font-semibold text-md hover:text-gray-400">
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li className="duration-200 font-semibold text-md hover:text-gray-600">
                <Button className="bg-indigo-500 p-2 rounded-md cursor-pointer" onClick={onLogout} type="button">Logout</Button>
              </li>
              
            </>
          )
            : (
            <>
              <li className="duration-200 font-semibold text-lg">
                <NavLink to="/register">Register</NavLink>
              </li>
              <li className="duration-200 font-semibold text-lg">
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
