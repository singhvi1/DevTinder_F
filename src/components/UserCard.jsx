import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/store/feedSlice";

const UserCard = ({ user }) => {
  const dispatch=useDispatch()
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;
  const handleRequest = (status, userId) => {
    try {
      const res = axios.post(
        BASE_URL + `/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId))
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="card bg-base-200 shadow-xl w-[340px] mx-auto overflow-hidden rounded-2xl ">
      <figure className="relative">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-[380px] object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/70 to-transparent p-4 text-white">
          <h2 className="text-2xl font-semibold">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-sm opacity-90">{`${age}, ${gender}`}</p>
          )}
        </div>
      </figure>

      <div className="card-body p-5">
        {about && <p className="text-sm text-white-700 mb-2">{about}</p>}
        {skills && (
          <p className="text-sm text-white-600 mb-4">
            <span className="font-semibold">Skills :</span> {skills}
          </p>
        )}

        <div className="card-actions justify-between mt-4">
          <button
            className="btn btn-outline btn-error w-[48%]"
            onClick={() => handleRequest("ignore" , _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary w-[48%]"
            onClick={() => handleRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
