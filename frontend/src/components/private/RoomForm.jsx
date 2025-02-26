import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const RoomForm = () => {
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();
  const onCreate = async () => {
  // Input validation
  if (!roomName) {
    alert("Room Name is required");
    return;
  }
  // Additional validation for react-hook-form
  if (roomName.trim() === "") {
    alert("Room Name cannot be empty");
    return;
  }
    try {
      // Get current user data
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);

      if (!token) {
        throw new Error("No authentication token found");
      }

      // Fetch user details
      const userResponse = await axios.get(
        "http://localhost:4000/api/auth/init",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userId = userResponse.data.data.Users.Id;
      console.log("User ID:", userId);

      // Create a new room
      console.log("Creating room:", roomName);
      const createRoomResponse = await axios.post(
        "http://localhost:4000/api/rooms",
        { name: roomName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Room created:", createRoomResponse.data);

      // Update user's roomId
      const updateroomIdResponse = await axios.put(
        `http://localhost:4000/api/users/${userId}`,
        { roomId: createRoomResponse.data.Id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Navigate to dashboard ONLY after updateroomIdResponse is returned
      console.log("Updated user room ID:", updateroomIdResponse.data);
      if (updateroomIdResponse.status === 200) {
        localStorage.setItem("token", updateroomIdResponse.data.token);
        setTimeout(() => {
          alert("Room created successfully!");
      navigate("/dashboard");
      fetchRooms(); // Refresh the room list
        }, 2000);
      }
    } catch (err) {
      console.error("Error creating room:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
      }
    }
  };

  const onJoin = async () => {
    try {
      // Get current user data
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);

      if (!token) {
        throw new Error("No authentication token found");
      }

      // Fetch user details
      const userResponse = await axios.get(
        "http://localhost:4000/api/auth/init",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userId = userResponse.data.data.Users.Id;
      console.log("User ID:", userId);

      // Join room
      console.log("Attempting to join room:", roomName);
      const joinRoomResponse = await axios.post(
        `http://localhost:4000/api/rooms/join/${roomName}`,
        { userId }, // Ensure userId is sent in the request body if needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Joined room:", joinRoomResponse.data);

      // Update user's roomId
      const updateroomIdResponse = await axios.put(
        `http://localhost:4000/api/users/${userId}`,
        { roomId: joinRoomResponse.data.Id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Updated user room ID:", updateroomIdResponse.data);

      // Navigate to dashboard ONLY after updateroomIdResponse is returned
      if (updateroomIdResponse.status === 200) {
        localStorage.setItem("token", updateroomIdResponse.data.token);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (err) {
      console.error("Error joining room:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-lg font-bold mb-4">Join or Create a Room</h1>
      <div className="flex flex-col w-80">
        <label className="mb-1">Name:</label>
        <input
          type="text"
          placeholder="Enter Room name"
          className="border border-gray-300 rounded-md p-2 mb-4"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />

        <button
          className="bg-purple-600 text-white rounded-md py-2 mb-2"
          onClick={onCreate}
        >
          Create room
        </button>

        <span className="text-center mb-2">Or</span>

        <button
          className="bg-purple-600 text-white rounded-md py-2"
          onClick={onJoin}
        >
          Join room with name
        </button>
      </div>
    </div>
  );
};

export default RoomForm;
