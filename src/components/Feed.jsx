import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/store/feedSlice";
import UserCard from "./UserCard";
import { useNavigate } from "react-router";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const currUser=useSelector((store)=>store.user)
  const navigate=useNavigate()
  useEffect(()=>{
    if(!currUser){
      return  navigate("/login",{ replace: true })
    }
  },[])

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.usersFeed));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (currUser &&(!feed || feed.length === 0)) {
      getFeed();
    }
  }, [currUser]);
  if (!feed || feed.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-3xl font-bold text-gray-500">No FEED Found 😢</h1>
      </div>
    );
  }
  return (
    feed && (
      <div className="flex justify-center h-screen items-center pb-20 mt-5">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
