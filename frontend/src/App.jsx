import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Login = React.lazy(() => import("./components/public/Login"));
const Register = React.lazy(() => import("./components/public/Register"));
const ChoreTracker = React.lazy(() =>
  import("./components/private/ChoreTracker")
);
const Dashboard = React.lazy(() => import("./components/private/Dashboard"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<Dashboard />}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
