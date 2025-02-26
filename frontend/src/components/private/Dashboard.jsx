import React, { useState } from "react";
import Sidebar from "./Sidebar";


const ChoreTracker = React.lazy(() => import("./ChoreTracker"));
const ExpenseSharing = React.lazy(() => import("./ExpenseSharing"));
const RoommateProfile = React.lazy(() => import("./RoommateProfile"));

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
    </div>
  );
}

export default Dashboard;
