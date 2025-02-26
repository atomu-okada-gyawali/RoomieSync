import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Sidebar({ setCurrentComp, handleLogout }) {
  const navigate = useNavigate();
  function handleLogout() {
    // Remove the token from localStorage
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <div className="h-full bg-white drop-shadow-lg rounded-md p-4">
      <h1 className="mt-4 mb-4 text-2xl font-bold text-center">RoomieSync</h1>
      <div className="mt-4">
        <button
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md drop-shadow-lg"
          onClick={() => {
            setCurrentComp("ChoreTracker");
          }}
        >
          Chore Tracker
        </button>
      </div>
      <div className="mt-4">
        <button
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md drop-shadow-lg"
          onClick={() => {
            setCurrentComp("ExpenseSharing");
          }}
        >
          Expense Sharing
        </button>
      </div>
      <div className="mt-4">
        <button
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md drop-shadow-lg"
          onClick={() => {
            setCurrentComp("RoommateProfile");
          }}
        >
          Roommate Profiles
        </button>
      </div>
      <div
        className="mt-4"
        onClick={() => {
          setCurrentComp("ExpenseWishList");
        }}
      >
      </div>
      {/* Logout Button */}
      <div className="mt-4">
        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md drop-shadow-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
