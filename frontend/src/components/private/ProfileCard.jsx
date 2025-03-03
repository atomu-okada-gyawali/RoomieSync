import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfileCard({
  id,
  name,
  contact,
  email,
  address,
  isSelf,
  photoPath,
  className,
  openHandler,
  onLeaveSuccess, // Ensure this is passed from the parent component
}) {
  const navigate = useNavigate();
  const [error, setError] = useState(null); // Define error state

  const leaveHandler = async (id) => {
    console.log("Leaving room...");
    const token = localStorage.getItem("token");

    try {
      const leaveRoomRes = await axios.put(
        `http://localhost:4000/api/users/leaveRoom/${id}`,
        {}, // Empty body if not required
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (leaveRoomRes.status === 200) {
        alert("Left room successfully!");
        localStorage.setItem("token", leaveRoomRes.data.token);
        // Notify parent component to update state
        if (onLeaveSuccess) {
          onLeaveSuccess(id);
        }
        
        // Only navigate if the request was successful
        setTimeout(() => {
          navigate("/RoomForm");
        }, 2000);
      } else {
        console.error("Failed to leave room:", leaveRoomRes.data);
        setError("Failed to leave room");
      }
    } catch (err) {
      console.error("Error leaving room:", err);
      setError("Failed to leave room");
    }
  };

  return (
    <div
      className={`h-40 w-5xl flex  items-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <img
        src={`http://localhost:4000/${photoPath}`}
        alt="User Profile"
        className="w-16 h-16 ml-14 rounded-full object-cover"
      />
      <div className="ml-36 flex flex-col">
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
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Display error message */}
      </div>
      <div className="w-2/5 flex gap-3  justify-center">
        {isSelf && (
          <button
            className="pt-1 pb-1 pr-2 pl-2 text-white flex items-center justify-center bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200 w-32"
            onClick={() => {
              leaveHandler(id);
            }}
          >
            Leave
          </button>
        )}

        {isSelf && (
          <button
            className="pt-1 pb-1 pr-2 pl-2 text-white flex items-center justify-center bg-green-500 rounded-lg hover:bg-green-600 transition-colors duration-200 w-32"
            onClick={openHandler}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;
