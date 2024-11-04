import axios from "axios";

const createUser = async (username: string, name: string, password: string) => {
  return axios.post("http://localhost:3000/users/create", {
    username,
    name,
    password,
  });
};

const login = async (username: string, password: string) => {
  return axios.post("http://localhost:3000/users/login", {
    username,
    password,
  });
};

const findUser = async (username: string) => {
  return axios.post("http://localhost:3000/users/finduser", {
    username,
  });
};

const clickTheButton = async (username: string) => {
  return axios.put("http://localhost:3000/users/click", {
    username,
  });
};

const upgradeClicker = async (username: string) => {
  return axios.put("http://localhost:3000/users/upgradeClick", {
    username,
  });
};

const gachaClickPower = async (username: string) => {
  return axios.put("http://localhost:3000/users/gachaClick", {
    username,
  });
};

const gachaPoints = async (username: string) => {
  return axios.put("http://localhost:3000/users/gachaPoints", {
    username,
  });
};

const unlockAutoClick = async (username: string) => {
  return axios.put("http://localhost:3000/users/autoclickunlock", {
    username,
  });
};

const autoClick = async (username: string) => {
  return axios.put("http://localhost:3000/users/autoclick", {
    username,
  });
};

const updateUser = async (
  username: string,
  name: string,
  password: string,
  file?: File
) => {
  const formData = new FormData();
  formData.append("username", username)
  formData.append("name", name);
  formData.append("password", password);

  // Jika ada file yang dipilih, tambahkan ke FormData
  if (file) {
    formData.append("profileImage", file);
  }
  console.log(formData);
  // Kirim FormData dengan Axios
  return axios.put("http://localhost:3000/users/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteUser = async (username?: string) => {
  return axios.delete("http://localhost:3000/users/delete", {
    data: { username },
  });
};

const getAllUsers = async () => {
  return axios.get("http://localhost:3000/users/");
};
export {
  createUser,
  login,
  findUser,
  clickTheButton,
  upgradeClicker,
  gachaClickPower,
  gachaPoints,
  unlockAutoClick,
  autoClick,
  updateUser,
  deleteUser,
  getAllUsers,
};
