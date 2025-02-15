import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full">
      <main className="h-screen w-full flex flex-col justify-center items-center gap-4">
        <form className="w-3/5 h-3/5 flex flex-col gap-8 justify-center p-8 shadow-lg">
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="h-10 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="h-10 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            id="submit"
            type="submit"
            className="h-10 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>
        <p
          onClick={() => navigate("/register")}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          Not signed up yet?
        </p>
      </main>
    </div>
  );
}

export default Login;
