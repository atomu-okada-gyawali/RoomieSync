import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChoreTracker from "./ChoreTracker";
import ExpenseSharing from "./ExpenseSharing";
import RoommateProfile from "./RoommateProfile";
import ExpenseWishList from "./ExpenseWishList";
function Dashboard() {
  const [currentComp, setCurrentComp] = useState("ChoreTracker");
  return (
    <div className="flex h-screen w-full">
      <div className="w-2/12 h-full">
        <Sidebar className="fixed" setCurrentComp={setCurrentComp} />
      </div>
      {currentComp === "ChoreTracker" && <ChoreTracker />}
      {currentComp === "ExpenseSharing" && <ExpenseSharing />}
      {currentComp === "RoommateProfile" && <RoommateProfile />}
      {currentComp === "ExpenseWishList" && <ExpenseWishList />}
    </div>
  );
}

export default Dashboard;
