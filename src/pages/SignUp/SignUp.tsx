import { FaFacebookSquare } from "react-icons/all";
import { useState } from "react";
import { Link } from "react-router-dom";
import phoneFrame from "../../assets/home-phones.png";
import people from "../../assets/screenshot4.png";
import { useFormik } from "formik";
import Firebase from "../../context/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState({
    email,
    userName,
    password,
  });
  // console.log(userDetails);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserDetails({ email, userName, password });
  };

  return (
    <div className="bg-gray-100">
      {/* flex for form and image */}
      <div className="lg:w-[60%] flex pt-2 mx-auto">
        {/* image hidden on mobile */}
        <div className="hidden lg:flex mt-10 relative ">
          <div className="image">
            <img src={phoneFrame} alt="" className="h-[90vh] w-[100%]" />
            <img
              src={people}
              alt=""
              className="h-[76vh] lg:w-[56%] xl:w-[55%] hidden xl:block absolute top-[1.78rem] lg:right-[3rem] xl:right-[3.4rem]"
            />
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-w-[22rem] mx-auto lg:mx-0 text-center ">
          <div className="px-10 pt-8 pb-8 bg-white font-semibold text-gray-400 border-2">
            <h1 className="text-5xl font-light  pt-3 text-black pb-2 font-display">
              Instagram
            </h1>

            <p className="py-4">
              Sign up to see photos and videos from your friends
            </p>
            <button
              className="bg-[#0095f6] text-white rounded-xl font-semi py-2 px-12 flex justify-center items-center gap-2 mx-auto
            ">
              <span>
                <FaFacebookSquare />
              </span>
              <span> login with facebook</span>
            </button>
            <div className="flex gap-2 justify-center items-center px-1 mt-4">
              <div className="divider"></div>
              <p>OR</p>
              <div className="divider"></div>
            </div>
            <div className="pt-3 pb-1 w-full">
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
              <input
                className="input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
                name="fullName"
                id="name"
                placeholder="Full Name"
              />
              <input
                className="input"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />
              <input
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id=""
                placeholder="Password"
              />
            </div>
            <div className=" text-xs font-normal">
              <p className="my-2 px-2">
                People who use our service may have upload your contact
                information on instagram. Learn more
              </p>
              <p>
                By signing up, you agree with out Terms, Privacy Policy and{" "}
              </p>
            </div>
            <button
              type="submit"
              className="w-full mt-2 bg-[#64bcf7] text-white rounded-lg font-semi py-1 px-12 flex justify-center items-center gap-2 mx-auto
            ">
              Sign up
            </button>
          </div>
          <div className="border-2 my-3 p-5 bg-white">
            <p>
              Have an account?{" "}
              <Link className="text-[#0095f6]" to={"/sign-in"}>
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
