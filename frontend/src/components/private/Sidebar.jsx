import { useState } from "react";

function Sidebar({ setCurrentComp }) {
  return (
    <div className="h-full bg-white drop-shadow-lg rounded-md p-4">
      <h1 className="mt-4 mb-4 text-2xl font-bold text-center">RoomieSync</h1>
      <div className="mt-4">
        <button
          className=" w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md drop-shadow-lg"
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
        <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md drop-shadow-lg">
          Expenses (WishList)
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
