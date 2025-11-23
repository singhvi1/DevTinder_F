import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser()
  }, [])

  const verifyPremiumUser = async () => {
    const res = await axios(BASE_URL + "/premium/verify", { withCredentials: true })
    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  }
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { memberShipType: type },
      { withCredentials: true }
    );
    //now it should open Razorpay dialog box
    const { keyId, amount, currency, notes, orderId } = order.data.data;
    const options = {
      key: keyId,
      amount: amount,
      currency: currency,
      name: notes?.firstName,
      description: "Connect to other developers",
      order_id: orderId,
      prefill: {
        name: notes?.firstName,
        email: notes?.email,
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
    console.log(order);
  };

  return isUserPremium ?
    <div className="flex h-screen justify-center items-center">
      <h1 className="font-bold text-3xl">You are already a premium Memeber</h1>
    </div> :
    (
      <div className="flex justify-center  m-10 py-20">
        <div className="flex w-full flex-col lg:flex-row">
          <div className="card bg-base-300 rounded-box grid h-80  grow place-items-center">
            <h1 className="font-bold text-3xl ">Silver MemberShip</h1>
            <ul>
              <li># Chat with other people</li>
              <li># 100 connection Requests per day</li>
              <li># Blue Tick</li>
              <li># 3 Months</li>
            </ul>
            <button
              className="btn btn-primary"
              onClick={() => handleBuyClick("silver")}
            >
              Buy Silver
            </button>
          </div>
          <div className="divider lg:divider-horizontal">OR</div>
          <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
            <h2 className="text-3xl font-bold">Gold MemeberShip</h2>
            <ul>
              <li># Chat with other people</li>
              <li># Unlimited connection Requests per day</li>
              <li># Blue Tick</li>
              <li># 6 Months</li>
            </ul>
            <button
              className="btn btn-secondary"
              onClick={() => handleBuyClick("gold")}
            >
              Buy Gold
            </button>
          </div>
        </div>
      </div>
    );
};

export default Premium;
