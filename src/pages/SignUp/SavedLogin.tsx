import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/image.jpg";
const SavedLogin = () => {
  return (
    <div className="h-[100vh] p-[5rem] bg-gray-100">
      <div className="w-[72%] bg-white md:w-[50%] lg:w-[40%] xl:w-[27%] mx-auto border-2 text-center">
        <h1 className=" font-light text-5xl my-10 font-display">Instagram</h1>
        <img
          src={image}
          alt=""
          className=" w-28 h-28 mb-2 rounded-full mx-auto"
        />

        <button className="py-[5px] px-8 mb-6 text-white rounded-md text-sm font-semibold my-5 bg-[#0095f6]">
          Continue as alexrengkat
        </button>
        <p className="pb-8 font-normal">
          Not alexrengkat?{" "}
          <Link to={"/sign-up"} className="font-semibold text-[#0095f6]">
            Switch accounts
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SavedLogin;
