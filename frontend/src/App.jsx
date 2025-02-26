import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "../src/utils/ProtectedRoutes";
const Login = React.lazy(() => import("./components/public/Login"));
const Register = React.lazy(() => import("./components/public/Register"));
const RoomForm = React.lazy(() => import("./components/private/RoomForm"));

const Dashboard = React.lazy(() =>
  import("./components/private/Dashboard")
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoutes />}>
              {/* Protected Routes */}
              <Route path="/RoomForm" element={<RoomForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
