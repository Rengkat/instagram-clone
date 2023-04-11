import React, { ChangeEvent, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import postLogo from "../../assets/post-logo.png";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../../context/firebase/firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { firebaseContext } from "../../context/firebase/firebaseContext";

const db = getFirestore(app);
const Create = () => {
  const navigate = useNavigate();
  const { user } = useContext(firebaseContext);
  const userUID = user?.uid;
  const postUsername = user?.userName;
  const profileImg = user?.profileImage;

  const [caption, setCaption] = useState("");
  const [inputFile, setInputFile] = useState<null | File>(null);
  const [uploadError, setUploadError] = useState("");
  const postRef = collection(db, "posts");

  const storage = getStorage(app);
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // console.log(files);
    if (files && files.length > 0) {
      const file = files[0];
      setInputFile(file);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // to make sure the inputfile is not null
    if (inputFile !== null) {
      // file should not be above 20mb
      if (inputFile.size > 20971520) {
        // error message to display and disappear after 3sec
        setUploadError("File too large! Upload file below 20mb");
        setTimeout(() => {
          setUploadError("");
        }, 3000);
      } else {
        const fileRef = ref(storage, "postsFile/" + inputFile?.name);
        await uploadBytes(fileRef, inputFile);
        const imgeUrl = await getDownloadURL(fileRef);
        await addDoc(postRef, {
          imgeUrl,
          caption,
          userUID,
          postUsername,
          profileImg,
          createdAt: serverTimestamp(),
        });
        // redirect to home once uopload
        navigate("/home");
      }
    }
    setCaption("");
    setInputFile(null);
  };
  return (
    <div className="h-screen relative">
      <div className=" absolute inset-0 w-full h-[100vh] ">
        <form
          onSubmit={handleSubmit}
          className=" mt-[5rem] w-[25rem] mx-auto md:mx-0 md:w-[34rem] h-[70vh] bg-[#2a2a2a] rounded-lg">
          <h4 className="text-center font-semibold py-3 border-b-[1px] border-[#505050] ">
            Create new post
          </h4>
          <div className=" flex justify-center mt-[5rem]">
            <img
              src={postLogo}
              alt=""
              className="w-[8rem] h-[5rem] object-cover"
            />
          </div>
          <h4 className="text-center font-semibold py-5 text-sm md:text-xl">
            Drop photos and videos here
          </h4>
          <div className="flex flex-col items-center">
            <div className="bg-[#1a91db] rounded-md relative w-[10rem]">
              <p className="text-center p-3">Select file</p>
              <input
                onChange={handleChangeFile}
                type="file"
                accept="image/*,video/*"
                required
                className=" cursor-pointer absolute inset-0 z-10 w-[50%] md-[100%]  opacity-0 "
              />
            </div>

            <p className="text-red-700 p-[5px] rounded-md">
              {uploadError && uploadError}
            </p>
            <textarea
              onChange={(e) => setCaption(e.target.value)}
              className="w-[70%] my-2 max-h-[5rem] rounded-md p-2 outline-none bg-black text-white"
              placeholder="cation..."
            />
            <button
              type="submit"
              className="bg-[#1a91db] w-[40%] py-1 px-2 rounded-lg font-semibold hover:bg-[#0257c5]">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
