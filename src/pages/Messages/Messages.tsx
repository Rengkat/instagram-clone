import { useContext, useEffect, useState } from "react";
import { firebaseContext } from "../../context/firebase/firebaseContext";
import ChatList from "./ChatList";
import image from "../../assets/image.jpg";
import Message from "./Message";
import { FiSend, BsFillImageFill } from "react-icons/all";
import {
  collection,
  where,
  query,
  getFirestore,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { app } from "../../context/firebase/firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const Messages = () => {
  const { user } = useContext(firebaseContext);
  const [chatList, setChatList] = useState<any>([]);
  const [chat, setChat] = useState<any>({});
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const db = getFirestore(app);
  const userChatsRef = collection(db, "userChats");
  const storage = getStorage(app);

  useEffect(() => {
    const getUserChats = async () => {
      const userChatQuery = query(
        userChatsRef,
        where("senderUid", "==", user.uid)
      );
      const respose = await getDocs(userChatQuery);
      const data = respose.docs.map((userChat) => ({
        ...userChat.data(),
        id: userChat.id,
      }));
      setChatList(data);
    };
    getUserChats();
  }, [chatList]);
  const onSecteUser = (cht: any) => {
    setChat(cht);
    const combinedId =
      user.uid > cht.recipiantUid
        ? `${user.uid + cht.recipiantUid}`
        : `${cht.recipiantUid + user.uid}`;
    const messagesRef = collection(db, "messages", combinedId, "chats");
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    onSnapshot(q, (querySnapshot) => {
      let messagesArry: any = [];
      querySnapshot.forEach((mesg) => messagesArry.push(mesg.data()));
      setMessages(messagesArry);
    });
  };

  const handleSubmit = async () => {
    console.log("first");
    const combinedId =
      user.uid > chat.recipiantUid
        ? `${user.uid + chat.recipiantUid}`
        : `${chat.recipiantUid + user.uid}`;

    await addDoc(collection(db, "messages", combinedId, "chats"), {
      text,
      from: user.uid,
      to: chat.recipiantUid,
      createdAt: serverTimestamp(),
    });
    setText("");
  };

  // console.log(imageMesge);
  return (
    <>
      <div className="w-full md:w-[60rem] h-[100vh] text-white flex bg-black mx-auto pt-10 pb-20">
        <div className=" hidden md:block border-2 border-gray-500 w-[30%] overflow-auto">
          <p className="font-bold text-xl text-center py-2 border-b-2 border-gray-700">
            Chats
          </p>
          {chatList?.map((chat: any) => {
            return (
              <ChatList
                chatUser={chat}
                key={chat.recipiantUid}
                onSecteUser={onSecteUser}
              />
            );
          })}
        </div>
        <div className="border-2 border-gray-500 w-[90%] mx-auto md:w-[70%] relative ">
          <div className="flex p-3 gap-3 border-b-2 border-gray-600 items-center">
            {chat?.recipianImg ? (
              <img
                src={image}
                alt=""
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-white"></div>
            )}
            {/* out full name but if it is not avilable, then username */}
            <p className="text-xl font-semibold">
              {chat.recipianFullName
                ? chat.recipianFullName
                : chat.recipianUsername}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div className=" overflow-hidden">
              {messages < 1 ? (
                <div className="text-center p-5 text-gray-400">
                  Select friend to start conversation
                </div>
              ) : (
                messages?.map((message: any) => {
                  return <Message message={message} key={Math.random()} />;
                })
              )}
            </div>
            <div className="flex absolute bottom-0 left-0 right-0 items-center justify-between border-[1px] border-gray-500 rounded-[2rem] bg-black p-2 m-3">
              <input
                onChange={(e) => setText(e.target.value)}
                value={text}
                type="text"
                className="w-[80%] p-[2px] border-none bg-black outline-none"
              />
              <div className="flex gap-3 pr-2">
                <FiSend fontSize={30} onClick={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
