import MainContain from "./MainContain";
import NavBar from "./Nav";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import TopImage from "./TopImage";
import { firebaseContext } from "../../context/firebase/firebaseContext";

const Home = () => {
  const { allPosts } = useContext(firebaseContext);
  // console.log(allPosts);
  return (
    <div
      className={`${
        allPosts
          ? "bg-black pb-[7rem] md:pb-[10rem] px-2 relative w-[30rem] mx-auto"
          : "h-[100vh] bg-black w-full"
      }`}>
      {/* Top nav only visible on mobile */}
      <NavBar />
      {/* top cirlce images */}
      <div className="flex gap-5 py-10">
        {allPosts?.slice(0, 6).map((post, index) => {
          return <TopImage post={post} key={index} />;
        })}
      </div>
      {/* Main contain */}

      <main>
        {allPosts?.length > 0 ? (
          <>
            {" "}
            {allPosts?.map((data, index) => {
              return <MainContain post={data} key={index} />;
            })}
          </>
        ) : (
          <>
            <div className="text-white h-[100vh] text-center">
              <p className="my-2 text-xl font-semibold">
                There is no post added
              </p>
              <p className="p-3 bg-[#1a91db] rounded-md w-[40%] mx-auto">
                <Link to="/create">Add a post </Link>
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
