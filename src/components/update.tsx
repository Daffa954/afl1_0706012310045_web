import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findUser, updateUser } from "../apis/userCRUD";
import { User } from "../models/User";

const Update = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(""); //input
  const [user, setUser] = useState<User>();
  const [password, setPassword] = useState(""); //input
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const username = "" + sessionStorage.getItem("username");

  useEffect(() => {
    if (!username) {
      navigate("/");
    } else {
      handleSetUser();
    }
  }, []); 

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSetUser = async () => {
    try {
      const response = await findUser(username);
      if (response.status === 200) {
        setUser(response.data);
        setName(response.data.name);
        setPassword(response.data.password);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await updateUser(
        username,
        name,
        password,
        selectedFile || undefined
      );
      if (response.status === 200) {
        alert("Profile updated successfully!");
        navigate("/game");
      }
    } catch (error) {
      alert("Failed to update profile: " + error);
    }
  };

  return (
    <>
      <div className="w-full bg-blue-400 h-screen flex justify-center items-center">
        <div className="w-[40%] bg-white rounded-lg shadow-lg p-6">
          <h1 className="font-bold text-3xl text-center mb-4">
            Update Profile
          </h1>
          <form onSubmit={handleUpdate}>
            <div className="flex flex-col mt-3">
              <label htmlFor="username" className="text-lg">
                Name
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="border-2 border-gray-300 p-2 mt-2 rounded-lg focus:outline-none focus:border-blue-500"
                value={name}
                onChange={handleSetName}
              />
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="border-2 border-gray-300 p-2 mt-2 rounded-lg focus:outline-none focus:border-blue-500"
                value={password}
                onChange={handleSetPassword}
              />
            </div>
            <div className="flex flex-col mt-3">
              <label htmlFor="file" className="text-lg">
                Upload Profile Image
              </label>
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleFileChange}
                className="border-2 border-gray-300 p-2 mt-2 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mt-3 text-center">
              <Link
                to="/signup"
                className="text-slate-400 hover:text-slate-600"
              >
                Don't have an account?
              </Link>
            </div>
            <div className="mt-5">
              <button
                className="bg-green-500 p-2 rounded-lg w-full text-white font-bold hover:bg-green-600 transition duration-200"
                type="submit"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Update;
