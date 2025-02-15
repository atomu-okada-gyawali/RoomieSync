import React from "react";

function ProfileCard({ name, contact, email, address, isSelf, className }) {
  return (
    <div
      className={`h-40 w-5xl flex justify-around items-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
      <div className="ml-4 flex flex-col">
        <p
          className={
            isSelf
              ? "text-emerald-500 text-lg font-semibold"
              : "text-lg font-semibold"
          }
        >
          Name: {name}
        </p>
        <p>Contact: {contact}</p>
        <p>Email: {email}</p>
        <p>Address: {address}</p>
      </div>
      <div className="w-2/5 flex gap-3  justify-center">
        <button
          className="pt-1 pb-1 pr-2 pl-2 text-white flex items-center justify-center bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200 w-32"
          onClick={() => {
            if (isSelf) {
              // Handle leave action
            } else {
              // Handle remove action
            }
          }}
        >
          {isSelf ? "Leave" : "Remove"}
        </button>

        {isSelf && (
          <button className="pt-1 pb-1 pr-2 pl-2 text-white flex items-center justify-center bg-green-500 rounded-lg hover:bg-green-600 transition-colors duration-200 w-32">
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
