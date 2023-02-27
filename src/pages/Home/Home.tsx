import {
  AiFillHome,
  MdExplore,
  FiSearch,
  RiVideoFill,
  MdAddBox,
  FaFacebookMessenger,
  BsHeart,
} from "react-icons/all";
import MainContain from "./MainContain";
import NavBar from "./Nav";
import { useEffect, useState } from "react";
import { PhotosTypes } from "../../Types/DataTypes";

// const data: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 99, 0];
const Home = () => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetch(
      "https://api.unsplash.com/photos/?client_id=xNNpps3UIufmvRJN0GUUC_eO9k6-IdhhMaxzH1URTK4"
    )
      .then((res) => res.json())
      .then((data) => setPhotos(data));
  }, []);
  return (
    <div>
      {/* Top nav only visible on mobile */}
      <NavBar />
      {/* Main contain */}
      <main>
        {photos?.map((data, index) => {
          // console.log(data);
          return <MainContain data={data} key={index} />;
        })}
      </main>
    </div>
  );
};

export default Home;
