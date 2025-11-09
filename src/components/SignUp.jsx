import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/store/userSlice";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [emailId, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [photoUrl, setPhotoUrl] = useState();
  const [skills, setSkills] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          photoUrl,
          gender,
          age,
          skills,
          emailId,
          password,
        },
        { withCredentials: true } //toSaveCookies (due to cors it not saved)
      );
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong ");
      console.error(err);
    }
  };
  return (
    <div className="flex min-h-screen justify-center items-center py-20">
      <div className="flex justify-center my-10 ">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
          <h2 className="fieldset-legend text-3xl justify-center">Sign Up</h2>

          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className="label">First Name</label>
              <input
                type="text"
                className="input"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="label">Last Name</label>
              <input
                type="text"
                className="input"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

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
          <div className="flex gap-4">
            <div className="flex flex-col w-1/2">
              <label className="label">age</label>
              <input
                type="number"
                className="age input"
                placeholder="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="flex flex-col ">
              <label className="label">gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select"
              >
                <option value="">Select your Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="others">other</option>
              </select>
            </div>
          </div>
          <label className="label">photoUrl</label>
          <input
            type="text"
            className="input"
            placeholder="photoUrl"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <label className="label">skills</label>
          <textarea
            placeholder="Tell your skills"
            className="textarea textarea-md"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          ></textarea>

          <p className="text-red-500">{error}</p>

          <button className="btn btn-neutral mt-4" onClick={handleSignup}>
            SignUp
          </button>
        </fieldset>
      </div>
    </div>
  );
};

export default SignUp;
