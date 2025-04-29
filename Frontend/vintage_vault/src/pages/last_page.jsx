import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@/custom-components/Card"; 
import Spinner from "@/custom-components/Spinner";

const LastPage = () => {
  const [loading, setLoading] = useState(false);
  const [dataType, setDataType] = useState(""); 
  const [data, setData] = useState([]);

  const fetchData = async (type) => {
    setLoading(true);
    try {
      let response;
      if (type === "users") {
        response = await axios.get("http://localhost:5000/api/v1/user/all");
        response= response.toArray.filter((user) => user.role !== "admin");
        setData(response.data.users);
      } else if (type === "items") {
        response = await axios.get("http://localhost:5000/api/v1/auctionitem/all");
        setData(response.data.items);
      } else if (type === "bids") {
        response = await axios.get("http://localhost:5000/api/v1/bid/all");
        setData(response.data.bids);
      }
      setDataType(type);
    } catch (error) {
      console.error("Failed fetching data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full px-5 pt-20 lg:pl-[320px] flex flex-col items-center">
      {}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => fetchData("users")}
          className="bg-[#d6482b] text-white px-6 py-2 rounded-2xl font-semibold hover:bg-[#b93b24]"
        >
          All Users
        </button>
        <button
          onClick={() => fetchData("items")}
          className="bg-[#d6482b] text-white px-6 py-2 rounded-2xl font-semibold hover:bg-[#b93b24]"
        >
          All Items
        </button>
        <button
          onClick={() => fetchData("bids")}
          className="bg-[#d6482b] text-white px-6 py-2 rounded-2xl font-semibold hover:bg-[#b93b24]"
        >
          All Bids
        </button>
      </div>

      {}
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {dataType === "users" &&
            data.map((user) => (
              <Card
                key={user._id}
                title={user.userName}
                imgSrc={user.profileImage?.url}
                startTime={user.email}
                endTime={user.phone}
                startingBid={user.role}
                id={user._id}
              />
            ))}

          {dataType === "items" &&
            data.map((item) => (
              <Card
                key={item._id}
                title={item.title}
                imgSrc={item.image?.url}
                startTime={item.startTime}
                endTime={item.endTime}
                startingBid={item.startingBid}
                id={item._id}
              />
            ))}

          {dataType === "bids" &&
            data.map((bid) => (
              <Card
                key={bid._id}
                title={bid.bidder?.userName}
                imgSrc={bid.bidder?.profileImage}
                startTime={`Amount: ₹${bid.amount}`}
                endTime={`Auction ID: ${bid.auctionItem}`}
                startingBid=""
                id={bid._id}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default LastPage;
