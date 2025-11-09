import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { NavLink, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
const Login = () => {
  const [emailId, setEmail] = useState("vk@gmil.com");
  const [password, setPassword] = useState("Vikash@123#");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true } //toSaveCookies (due to cors it not saved)
      );
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong ");
      console.error(err);
    }
  };
  return (
    <div className="flex justify-center my-10 ">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
        <h2 className="fieldset-legend text-3xl justify-center">Login</h2>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-500">{error}</p>

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
        <p className="px-6 py-2 text-sm text-center dark:text-gray-600 cursor-pointer">
          Don't have an account yet?
          <NavLink
            rel="noopener noreferrer"
            to="/signup"
            className="hover:underline dark:text-violet-600"
          >
            Sign up
          </NavLink>
          .
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
