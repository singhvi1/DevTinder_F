import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/store/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [showToast, setShowToast] = useState(false);

  const handleRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + `/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data.connections));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!requests || requests.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-3xl font-bold text-gray-500">
          No Requests Found 😢
        </h1>
      </div>
    );
  }

  return (
    <div className="my-10 mb-20">
      {showToast && (
        <div className="toast toast-top toast-center z-999">
          <div className="alert alert-info">
            <span>Request handled successfully 🎉</span>
          </div>
        </div>
      )}
      <h1 className="text-center font-bold text-4xl mb-6">My Requests</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          return (
            <li
              key={_id}
              className="bg-base-300 rounded-lg p-4 flex flex-col items-center text-center"
            >
              <img
                src={photoUrl}
                alt={`${firstName} ${lastName}`}
                className="h-24 w-24 rounded-full object-cover border border-gray-400  mb-4"
              />
              <h2 className="text-xl font-semibold">{`${firstName} ${lastName}`}</h2>
              <p>
                {gender} • {age ? `${age} yrs` : "Age N/A"}
              </p>
              <p>{about || "No about info available."}</p>
              <div className="flex gap-6 justify-between mt-4">
                <button
                  className="btn btn-outline btn-error w-[48%]"
                  onClick={() => handleRequest("rejected", request._id)}
                >
                  Ignore
                </button>
                <button
                  className="btn btn-primary w-[48%]"
                  onClick={() => handleRequest("accepted", request._id)}
                >
                  Interested
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Requests;
