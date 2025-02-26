import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";


function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users",
        data
      );
      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-4/5 h-10/12 flex rounded-lg shadow-xl bg-white overflow-hidden">
        {/* Left Container */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-purple-900">
          <h1 className="text-3xl font-bold text-amber-50 mb-4">Sign Up</h1>
          <p className="text-lg text-amber-50">
            Already have an account?{" "}
            <a
              href="#"
              onClick={() => navigate("/")}
              className="text-white-300 hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>

        {/* Form */}
        <div className="w-1/2 flex justify-center items-center ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Registration successful! Redirecting to login...
              </div>
            )}

            {[
              "name",
              "address",
              "contact",
              "email",
              "password",
              "confirm password",
            ].map((field, index) => (
              <div key={index}>
                <label
                  htmlFor={field}
                  className="inline-block text-lg font-medium w-40 text-center mr-5"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <input
                  type={
                    field.includes("password")
                      ? "password"
                      : field === "email"
                      ? "email"
                      : "text"
                  }
                  {...register(field, {
                    required: `${
                      field.charAt(0).toUpperCase() + field.slice(1)
                    } is required`,
                    ...(field === "contact" && {
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Invalid contact number (10 digits required)",
                      },
                    }),
                    ...(field === "email" && {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }),
                    ...(field === "password" && {
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    }),
                    ...(field === "confirm_password" && {
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    }),
                  })}
                  className={`h-10 px-4 border rounded focus:outline-none focus:ring-2 ${
                    errors[field]
                      ? "border-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[field].message}
                  </p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={isLoading}
              className="h-10 px-4 bg-purple-600 text-white font-semibold rounded hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isLoading ? "Registering..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Register;
