import { FaFacebookSquare } from "react-icons/all";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  addUserToLocalStorage,
  app,
} from "../../context/firebase/firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [sigingError, setSigningError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // console.log("User logged in: ", user);
    } catch (error) {
      // console.log(error.code, error.message);
      // setSigningError(error.message);
    }
  };
  // handle signing in
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    if (email.trim() == "" || password.trim() == "") {
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      setErrorMsg("Sorry, enter all fileds!");
    } else {
      signIn(email, password);
      navigate("/");
    }
    e.preventDefault();
  };
  return (
    <div className="bg-gray-100 h-screen">
      <div className="max-w-[22rem] mx-auto pt-3 ">
        <div className="bg-white px-10 pt-8 pb-8 border-2">
          <h1 className="text-5xl text-center font-light  pt-3 pb-10  text-black font-display">
            Instagram
          </h1>
          <form onSubmit={handleSignIn}>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="singinbtn "
              placeholder="Phone number, username, or email"
              type="text"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="singinbtn"
              type="password"
              placeholder="Password"
              name=""
              id=""
            />
            <p className="text-red-500 font-normal text-sm py-1">
              {errorMsg && errorMsg}
            </p>
            <p className="text-red-500 font-normal text-sm py-1">
              {sigingError && sigingError}
            </p>
            <button className=" bg-[#64bcf7] text-white w-full rounded-md font-semi py-1 px-12 my-3 flex justify-center mx-auto">
              Log in
            </button>
          </form>
          <div className="flex gap-2 justify-center items-center px-1 mt-4 mb-6">
            <div className="divider"></div>
            <p>OR</p>
            <div className="divider"></div>
          </div>
          <p className="flex justify-center items-center gap-3 font-bold text-blue-800">
            <FaFacebookSquare className="text-blue-900" />{" "}
            <span>Log in with Facebook</span>
          </p>
          <p className="text-center pt-5 font-normal text-sm">
            Forgot password?
          </p>
        </div>
        <div className="border-2 my-3 p-5 bg-white text-center">
          Don't have an account?{" "}
          <Link className="text-[#0095f6]" to={"/sign-up"}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
