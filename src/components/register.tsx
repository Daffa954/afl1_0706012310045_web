import { useState } from "react";
import { createUser } from "../apis/userCRUD";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleSetUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleSetname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegisterButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
   
    try {
      const response = await createUser(username, name, password);
      if (response.status === 200) {
        console.log("User created successfully!");
        console.log(response.data)
        sessionStorage.setItem("username",  response.data);
        navigate("/game");
      }
    } catch (error) {
      alert(error);
    }
    setPassword("")
    setUsername("")
    setName("")
  };
  
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Create an Account
        </h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-lg font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
              value={username}
              onChange={handleSetUsername}
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
              value={name}
              onChange={handleSetname}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
              value={password}
              onChange={handleSetPassword}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition"
            onClick={handleRegisterButton}
          >
            Register
          </button>
          <div className="mt-4 text-center">
            <Link to="/login" className="text-sm text-blue-500 hover:underline">
              Already have an account? Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;
