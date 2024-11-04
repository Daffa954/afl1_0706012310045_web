import { useEffect, useState } from "react";
import background from "../assets/background.jpeg";
import { useNavigate } from "react-router-dom";
import { deleteUser, findUser } from "../apis/userCRUD";
import { User } from "../models/User";

const Profile = () => {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const username = "" + sessionStorage.getItem("username");

  const handleSetUser = async () => {
    try {
      const response = await findUser(username);
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem("username");
    if (!user) {
      navigate("/");
    } else {
      handleSetUser();
    }
  }, [username]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (confirmed) {
      try {
        const response = await deleteUser(username);
        if (response.status === 200) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("username");
    navigate('/');
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="h-[100vh] flex justify-center items-center"
    >
      <div className="p-8 bg-[#000000b3] w-[90%] max-w-md rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          My Profile
        </h1>
        <img
          src={"http://localhost:3000/" + user?.profileImage}
          alt="User Profile"
          width={150}
          height={150}
          className="m-auto mt-3 rounded-full border-4 border-gray-300 shadow-md"
        />
        <div className="mt-5">
          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-300">Name</p>
            <p className="text-2xl font-medium text-white">{user?.name}</p>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-300">Username</p>
            <p className="text-2xl font-medium text-white">{user?.username}</p>
          </div>
          <div className="mt-4">
            <p className="text-lg font-semibold text-gray-300">Points</p>
            <p className="text-2xl font-medium text-white">{user?.points}</p>
          </div>
          <div className="flex justify-between mt-5">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200"
              onClick={() => navigate("/game")}
            >
              Back
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <div className="flex mt-6 gap-4 justify-center">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200"
              onClick={() => navigate("/update")}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition duration-200"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
