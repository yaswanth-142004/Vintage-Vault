// src/custom-components/UserCard.jsx
import React from "react";

const UserCard = ({ title, imgSrc, email, phone, role, id }) => {
  return (
    <div className="w-72 bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 text-sm">Email: {email}</p>
        <p className="text-gray-600 text-sm">Phone: {phone}</p>
        <p className="text-gray-600 text-sm">Role: {role}</p>
      </div>
    </div>
  );
};

export default UserCard;
