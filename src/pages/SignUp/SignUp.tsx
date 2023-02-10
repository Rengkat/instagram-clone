import { FaFacebookSquare } from "react-icons/all";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="bg-gray-100">
      {/* flex for form and image */}
      <div className="flex pt-3">
        {/* image hidden on mobile */}
        <div className="hidden md:flex ">
          <div className="image"></div>
        </div>
        <form className="max-w-[22rem] mx-auto text-center ">
          <div className="px-10 pt-8 pb-8 bg-white font-semibold text-gray-400  border-2 border-grey-400">
            <h1 className="text-4xl font-extrabold pt-3 text-black pb-2">
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
                type="text"
                placeholder="Mobile number or Email"
              />
              <input className="input" type="text" placeholder="Full Name" />
              <input className="input" type="text" placeholder="Username" />
              <input className="input" type="password" placeholder="Password" />
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
