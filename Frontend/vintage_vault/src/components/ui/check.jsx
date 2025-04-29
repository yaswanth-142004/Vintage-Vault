import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../custom-components/UserCard";




const Check = () => {


    const [loading, setLoading] = useState(false);
    const[ userdata , setuserdata] = useState([]);
   const  fetchusers = async () =>{
        const response = await axios.get("http://localhost:5000/api/v1/user/all");
        const filtered_data = response.data.users.filter((user) => user.role == "Bidder");
        setuserdata(filtered_data);

    }


  return (
    <div className="w-full px-5 pt-20 lg:pl-[320px] flex flex-col items-center">


        <button onClick={()=> fetchusers()}
            className="bg-[#d6482b] text-white px-6 py-2 rounded-2xl font-semibold hover:bg-[#b93b24]">
            get users
        </button>


       <div className="flex flex-wrap gap-6 justify-center">
                {
                  userdata.map((user) => (
                    <UserCard
                      key={user._id}
                      title={user.userName}
                      imgSrc={user.profileImage?.url}
                      email={user.email}
                      phone={user.phone}
                      role={user.role}
                      id={user._id}
                    />
                  ))}
                </div>


      
    </div>
  )
}

export default Check;
