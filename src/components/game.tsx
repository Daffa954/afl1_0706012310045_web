import { useEffect, useState } from "react";
import { User } from "../models/User";
import asset4 from "../assets/asset4.png";
import background from "../assets/background.jpeg";

import {
  autoClick,
  clickTheButton,
  findUser,
  gachaClickPower,
  gachaPoints,
  unlockAutoClick,
  upgradeClicker,
} from "../apis/userCRUD";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const GameView = () => {
  const navigate = useNavigate();

  const [points, setPoints] = useState(0);
  const [user, setUser] = useState<User>();
  const [clickpower, setClickPower] = useState(0);
  const [autoClickPower, setAutoClickPower] = useState(0);
  const [isAutoClickerActive, setIsAutoClickerActive] = useState(false);
  const username = "" + sessionStorage.getItem("username");

  useEffect(() => {
    const user = sessionStorage.getItem("username");
    if (!user) {
      navigate("/");
    } else {
      handleSetUser();
    }
  }, [username]);

  const handleSetUser = async () => {
    try {
      const response = await findUser(username);
      if (response.status === 200) {
        setUser(response.data);
        setPoints(response.data.points);
        setClickPower(response.data.clickPower);
        setIsAutoClickerActive(response.data.unlockedAutoClicker);
        setAutoClickPower(response.data.autoClickerPower);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickButton = async () => {
    try {
      const response = await clickTheButton(username);
      if (response.status === 200) {
        handleSetUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpgradeClickPower = async () => {
    try {
      const response = await upgradeClicker(username);
      if (response.status === 200) {
        handleSetUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGachaClickPower = async () => {
    try {
      const response = await gachaClickPower(username);
      if (response.status === 200) {
        handleSetUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGachaPoints = async () => {
    try {
      const response = await gachaPoints(username);
      if (response.status === 200) {
        handleSetUser();
        if (response.data.message === 3) {
          alert("Anda beruntung!");
        } else {
          alert("Anda kurang beruntung: " + response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlockAutoClick = async () => {
    try {
      const response = await unlockAutoClick(username);
      if (response.status === 200) {
        handleSetUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAutoClick = async () => {
    try {
      const response = await autoClick(username);
      if (response.status === 200) {
        handleSetUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAutoClickerActive) {
      const interval = setInterval(() => {
        handleAutoClick();
      }, 1000); // Setiap 1 detik

      // Cleanup interval saat Auto Clicker dimatikan
      return () => clearInterval(interval);
    }
  }, [isAutoClickerActive, autoClickPower]);

  return (
    <>
      <div
       style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      >
        
        <Navbar />
       
        <div className="flex w-full p-4 h-[100vh]  justify-between">
          {/* Bagian Kiri */}
          <div className="w-[60%] flex flex-col items-center">
            <h1 className="text-slate-300">Name: {user?.name}</h1>
            <p className="text-2xl font-bold mb-2 text-slate-300">Points: {points}</p>
            <p className="text-lg mb-4 text-slate-300">Click Power: {clickpower}</p>
            <button onClick={handleClickButton} >
              <img
                src={asset4}
                className="hover:scale-105 transition-transform"
                width={530}
                height={530}
              />
            </button>
          </div>

          {/* Bagian Kanan */}
          <div className="w-[30%] bg-[#06060661] p-4 rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4 text-slate-300">Upgrades</h1>
            <div className="flex flex-col space-y-4">
              <button
                className="bg-[#aaa39f94] text-white px-4 py-2 text-start rounded hover:bg-[#999489] transition-colors"
                onClick={handleUpgradeClickPower}
              >
                1. Power Clicker +1 Capybaras per click (50 coins)
              </button>
              <button
                className="bg-[#aaa39f94] text-white px-4 py-2 text-start rounded hover:bg-[#999489] transition-colors"
                onClick={handleGachaPoints}
              >
                2. Gacha: x2 or 0 (100 coins)
              </button>
              <button
                className="bg-[#aaa39f94] text-white px-4 py-2 text-start rounded hover:bg-[#999489] transition-colors"
                onClick={handleGachaClickPower}
              >
                3. Gacha Power Click: x2 or 1 (100 coins)
              </button>
              
              <button
                className="bg-[#aaa39f94] text-white px-4 py-2 rounded text-start hover:bg-[#999489] transition-colors"
                onClick={handleUnlockAutoClick}
              >
                4. Unlock Auto Clicker {autoClickPower + 1} (150 coins)
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameView;
