import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  return (
    <main className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-3/5 h-full flex rounded-lg shadow-xl bg-white overflow-hidden">
        {/* Left Container */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-gray-200">
          <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
          <p className="text-lg">
            Already have an account?{" "}
            <a
              href="#"
              onClick={() => navigate("/")}
              className="text-blue-500 hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>

        {/* Form */}
        <form className="w-1/2 p-10 flex flex-col gap-4">
          <label htmlFor="fullname" className="text-lg font-medium">
            Fullname:
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            className="h-10 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="age" className="text-lg font-medium">
            Age:
          </label>
          <input
            type="number"
            name="age"
            id="age"
            className="h-10 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="contact" className="text-lg font-medium">
            Contact Number:
          </label>
          <input
            type="text"
            name="contact"
            id="contact"
            className="h-10 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="email" className="text-lg font-medium">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="h-10 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="password" className="text-lg font-medium">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="h-10 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="confirm_password" className="text-lg font-medium">
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            className="h-10 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="h-10 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

export default Register;
