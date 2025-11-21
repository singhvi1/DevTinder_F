import React, { useState } from "react";
import { addUser } from "../utils/store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about, skills },
        { withCredentials: true }
      );
      setShowToast(true);
      dispatch(addUser(res.data.data));
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong ");
      console.error(err);
    }
  };
  return (
    <div className="relative">
      {showToast && (
        <div className="toast toast-top toast-center z-999">
          <div className="alert alert-info">
            <span>Profile Saved successfully</span>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-center my-10">
        <div className="flex justify-center pb-10">
          <div className="flex justify-center mx-10">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
              <h2 className="fieldset-legend text-3xl justify-center">
                Edit Your Profile
              </h2>

              <label className="label">FirstName</label>
              <input
                type="text"
                className="input"
                placeholder="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className="label">lastName</label>
              <input
                type="text"
                className="input"
                placeholder="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
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
              <label className="label">age</label>
              <input
                type="number"
                className="input"
                placeholder="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <label className="label">PhotUrl</label>
              <input
                type="text"
                className="input"
                placeholder="Your image address"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
              <label className="label">Skills</label>
              <input
                type="text"
                className="input"
                placeholder="Skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              <label className="label">About</label>

              <textarea
                className="textarea"
                placeholder="About section"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>

              <p className="text-red-500">{error}</p>

              <button className="btn btn-neutral mt-4" onClick={handleLogin}>
                Save
              </button>
            </fieldset>
          </div>
        </div>
        <div>
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about, skills }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
