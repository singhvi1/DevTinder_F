import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { removeUser } from "../utils/store/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch=useDispatch()
  const navigate=useNavigate()


  const handleLogout =async () => {
    try{
      await axios.post(BASE_URL+"/logout",{},{ withCredentials: true })
      dispatch(removeUser())
      navigate("/login")
      
    }catch(err){
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost text-xl">
          ❤️ DevTinder
        </NavLink>
      </div>
      {user && (
        <div className="flex gap-2">
          <p className="my-2">welcome {user.firstName}</p>
          <div className="dropdown dropdown-end mx-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/connections">Connectoins</NavLink>
              </li>
              <li>
                <NavLink to="/requests">Requests</NavLink>
              </li>
              <li>
                <NavLink onClick={handleLogout}>Logout</NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
