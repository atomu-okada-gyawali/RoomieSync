import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import login from "../../assets/login.jpg";
import icon from "../../assets/logo.jpg";
function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchUser = async (token) => {
    if (!token) {
      throw new Error("No authentication token found");
    }

    try {
      const userResponse = await axios.get(
        "http://localhost:4000/api/auth/init",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(JSON.stringify(userResponse.data.data));
      return userResponse;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        data
      );
      if (response.status === 200) {
        setSuccess(true);
        console.log(response);
        localStorage.setItem("token", response.data.data.access_token);
        const fetchRes = fetchUser(response.data.data.access_token);
        if ((await fetchRes).data.data.Users.RoomId != null) {
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          setTimeout(() => {
            navigate("/roomForm");
          }, 2000);
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white flex rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
        <div className="w-full md:w-1/2 p-8">
          <div className="flex items-center mb-8">
            <img src={icon} alt="RoomieSync logo" className="h-10 w-10 mr-2" />
            <h1 className="text-2xl font-bold">RoomieSync</h1>
          </div>
          <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
          <p className="text-gray-600 mb-6">Please enter your details</p>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Login successful! Redirecting...
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email address</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  minLength: {
                    value: 3,
                    message: "Email must be at least 3 characters",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-purple-600"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-purple-600"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-200"
            >
              {isLoading ? "Logging in..." : "Sign in"}
            </button>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <p
              onClick={() => {
                navigate("/register");
              }}
              className="text-purple-600 hover:underline"
            >
              Sign up
            </p>
          </p>
        </div>
        <div className="hidden md:block md:w-1/2 bg-purple-600 p-8">
          <img
            src={login}
            alt="Illustration of a person with various icons"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
