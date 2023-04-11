import React from "react";
import { useEffect, useState, useContext } from "react";
import { BiLike, BiChart, FaHeart } from "react-icons/all";
import EachPost from "./EachPost";
import { firebaseContext } from "../../context/firebase/firebaseContext";
import { Link } from "react-router-dom";

const Explore = () => {
  const { allPosts } = useContext(firebaseContext);

  return (
    <div className="px-2 py-[5rem] relative h-[100vh]">
      {allPosts?.length > 0 ? (
        <div className="md:w-[90%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allPosts.map((photo, i) => {
            return <EachPost data={photo} key={i} />;
          })}
        </div>
      ) : (
        <>
          <div className="text-white h-[100vh]">
            <p>There is no post added</p>
            <p className="p-3 rounded-md bg-[#1a91db]">
              <Link to="/create">Add a post </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Explore;
