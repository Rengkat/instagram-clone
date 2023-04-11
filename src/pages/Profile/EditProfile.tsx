import { AiOutlineLeft } from "react-icons/all";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { firebaseContext } from "../../context/firebase/firebaseContext";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../../context/firebase/firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { user } = useContext(firebaseContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.fullName);
  const [username, setUsername] = useState(user?.userName);
  const [website, setWebsite] = useState(user?.website);
  const [bio, setBio] = useState(user?.bio);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [gender, setGender] = useState(user?.gender);
  const [profileUrl, setProfileUrl] = useState<null | File>(null);
  // console.log(gender);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const userRef = collection(db, "users");
  const userQuery = query(userRef, where("uid", "==", user.uid));
  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (profileUrl !== null) {
      const fileRef = ref(storage, "profileImage/" + profileUrl?.name);
      await uploadBytes(fileRef, profileUrl);
      const profileImageUrl = await getDownloadURL(fileRef);
      onSnapshot(userQuery, (querySnapshot) => {
        querySnapshot.forEach((userDoc) => {
          try {
            updateDoc(doc(db, "users", userDoc.id), {
              userName: username,
              fullName: name,
              phone: phone,
              gender: gender,
              website: website,
              bio: bio,
              profileImage: profileImageUrl,
            });
            navigate("/profile");
          } catch (error) {}
        });
      });
    }
  };
  const handleEditImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setProfileUrl(file);
    }
  };
  return (
    <div className="pb-[4rem] md:px-10 md:w-[60%] md:border-2 md:border-gray-600 md:my-5">
      <div className="flex gap-[8rem] py-2 px-5 border-b-[1px] border-gray-700 md:hidden">
        <Link to="/profile">
          <AiOutlineLeft fontSize={28} className="text-white" />
        </Link>
        <h3 className="font-semibold">Edit profile</h3>
      </div>
      <div className="font-semibold flex gap-5 p-5 ">
        {/* if there is image, the display it, if not display only a white circle */}
        {user?.profileImage ? (
          <img
            src={user?.profileImage}
            alt=""
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <p className=" text-[10px] text-black">Image</p>
          </div>
        )}

        <div>
          <p>{user?.userName}</p>
          <div className="relative">
            <input
              onChange={handleEditImage}
              type="file"
              className=" z-10 absolute opacity-0"
              accept="image/*"
            />
            <p className="text-blue-400  ">Change profile photo</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleEdit} className="px-5 py-2">
        <div>
          <div className="flexInput">
            <label htmlFor="name">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="input2"
              type="text"
            />
          </div>
          <p className="p">
            Help people discover your account by using the name you're known by:
            either your full name, nickname, or business name. You can only
            change your name twice within 14 days.
          </p>
        </div>
        <div>
          <div className="flexInput">
            <label htmlFor="name">Username</label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="input2"
              type="text"
            />
          </div>
          <p className="p">
            In most cases, you'll be able to change your username back to
            alexrengkat for another 14 days
          </p>
        </div>
        <div>
          <div className="flexInput">
            <label htmlFor="name">Website</label>
            <input
              onChange={(e) => setWebsite(e.target.value)}
              value={website}
              className="input2"
              type="text"
            />
          </div>
          <p className="p">
            Editing your links is only available on mobile. Visit the Instagram
            app and edit your profile to change the websites in your bio.
          </p>
        </div>
        <div>
          <div className="flexInput">
            <label htmlFor="name">Bio</label>
            <input
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              className="input2"
              type="text"
              maxLength={150}
            />
          </div>
          <p className="p">0/150</p>
        </div>
        <h4>Personal information</h4>
        <p className="p">
          Provide your personal information, even if the account is used for a
          business, a pet or something else. This won't be a part of your public
          profile
        </p>
        <div className="flexInput">
          <label htmlFor="name">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="input2"
            type="email"
          />
        </div>
        <div className="flexInput">
          <label htmlFor="name">Phone number</label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            className="input2"
            type="text"
          />
        </div>
        <div className="flexInput">
          <label htmlFor="name">Gender</label>
          <select
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            className="input2">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="female">Prefer not say</option>
          </select>
        </div>
        <button
          type="submit"
          className=" bg-blue-500 py-1 px-3 rounded-md font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
