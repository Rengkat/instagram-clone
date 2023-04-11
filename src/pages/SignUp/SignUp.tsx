import { FaFacebookSquare } from "react-icons/all";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import phoneFrame from "../../assets/home-phones.png";
import people from "../../assets/screenshot4.png";
import { firebaseContext } from "../../context/firebase/firebaseContext";
import { app } from "../../context/firebase/firebaseConfig";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  onSnapshot,
  query,
  doc,
  getDoc,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginError, setLonginError] = useState("");
  const { users } = useContext(firebaseContext);
  const navigate = useNavigate();
  const db = getFirestore(app);
  // console.log(users);

  const usersCollectionRef = collection(db, "users");
  // if user exist function
  const doesUsernameExist = async (username: string) => {
    const q = query(usersCollectionRef, where("userName", "==", username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.size > 0;
  };

  // sign up function
  const auth = getAuth();

  const handleSignup = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // assuming you have a "users" collection in your Firestore database
      await addDoc(usersCollectionRef, {
        uid: user.uid,
        email: user.email,
        userName,
        fullName,
        imageUrl: "",
        phone: "",
        birthDate: "",
        gender: "",
        website: "",
        bio: "",
        profileImage: "",
        followers: [],
        following: [],
        post_count: 0,

        // any other user data you want to store
      });
      // console.log("User signed up and stored to Firestore:", user);
    } catch (error) {
      // setError(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // call the user exist function
    const userNameExist = await doesUsernameExist(userName);
    if (
      userName.trim() == "" ||
      fullName.trim() == "" ||
      password.trim() == "" ||
      email.trim() == ""
    ) {
      setLonginError("Please enter all fileds");
      // display message for 3 secod
      setTimeout(() => {
        setLonginError("");
      }, 3000);
      return;
    } else {
      if (userNameExist) {
        setError("Sorry, username exist");
        // display error message for 5 secod
        setTimeout(() => {
          setError("");
        }, 5000);
      } else {
        // call the sign up function
        await handleSignup(email, password);
        navigate("/sign-in");
      }
    }
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
              <p className="text-red-500 text-left">{error && error}</p>
              <p className="text-red-500 text-left">
                {loginError && loginError}
              </p>
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
