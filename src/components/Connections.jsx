import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { connect, useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/store/connectionSlice";



const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();


  const fetchConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connectoins", {
      withCredentials: true,
    });
    dispatch(addConnections(res.data.data));
  };
  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if(!connections || connections.length ==0){
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-3xl font-bold text-gray-500">
          No Connections Found  😢
        </h1>
      </div>
    )
  }
  return (
    connections?.length > 0 && (
      <div className="my-10 mb-20">
        <h1 className="text-center font-bold text-4xl mb-6">My connections</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              connection;
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
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default Connections;
