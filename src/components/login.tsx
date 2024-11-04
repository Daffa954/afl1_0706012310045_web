import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllUsers, login } from "../apis/userCRUD";
import { User } from "../models/User";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); //input
  const [password, setPassword] = useState(""); //input
  const [users, setUsers] = useState<User[]>([]);
  const handleSetUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLoginButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      if (response.status === 200) {
        console.log("Successfully logged in!");
        sessionStorage.setItem("username", response.data.username);
        navigate("/game");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Incorrect username/password");
    }
    setPassword("");
    setUsername("");
  };

  const handleGetAllUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.status == 200) {
        setUsers(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetAllUsers();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mt-52">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Welcome Back</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-lg font-medium text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 transition"
              value={username}
              onChange={handleSetUsername}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-100 transition"
              value={password}
              onChange={handleSetPassword}
              required
            />
          </div>
          <div className="text-right">
            <Link to="/signup" className="text-sm text-purple-500 hover:underline">Don’t have an account?</Link>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition"
            onClick={handleLoginButton}
          >
            Log In
          </button>
        </form>
      </div>
      <table className="w-full max-w-4xl mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-purple-500 text-white">
            <th className="py-3 px-4 border-2 border-purple-600">ID</th>
            <th className="py-3 px-4 border-2 border-purple-600">Photo</th>
            <th className="py-3 px-4 border-2 border-purple-600">Name</th>
            <th className="py-3 px-4 border-2 border-purple-600">Username</th>
            <th className="py-3 px-4 border-2 border-purple-600">Points</th>
            <th className="py-3 px-4 border-2 border-purple-600">Click Power</th>
            <th className="py-3 px-4 border-2 border-purple-600">Auto Clicker</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const { id, username, name, points, clickPower, unlockedAutoClicker, profileImage } = user;
            return (
              <tr key={id} className="bg-gray-50 hover:bg-gray-100 transition">
                <td className="py-3 px-4 border-2 border-purple-600">{id}</td>
                <td className="py-3 px-4 border-2 border-purple-600">
                  <img src={`http://localhost:3000/${profileImage}`} alt="profile" width={50} height={50} className="rounded-full mx-auto" />
                </td>
                <td className="py-3 px-4 border-2 border-purple-600">{name}</td>
                <td className="py-3 px-4 border-2 border-purple-600">{username}</td>
                <td className="py-3 px-4 border-2 border-purple-600">{points}</td>
                <td className="py-3 px-4 border-2 border-purple-600">{clickPower}</td>
                <td className="py-3 px-4 border-2 border-purple-600">{unlockedAutoClicker ? "On" : "Off"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Login;
