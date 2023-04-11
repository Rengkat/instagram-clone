import { firebaseContext } from "../../context/firebase/firebaseContext";
import { useContext, useEffect, useRef } from "react";
const Message = ({ message }: any) => {
  const messageRef = useRef<React.ReactNode | any>();
  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const { user } = useContext(firebaseContext);
  return (
    <>
      <div
        ref={messageRef}
        className={`p-3 ${
          message.from === user.uid ? " flex justify-end " : ""
        }  `}>
        <div>
          {message.image ? (
            <>
              <img
                src={message.image}
                alt={message.text}
                className="w-12 h-12 object-cover"
              />
            </>
          ) : null}
          <p
            className={`py-1 px-3 ${
              message.from === user.uid
                ? " bg-white text-black inline-block rounded-[1rem]"
                : "bg-blue-500 text-black inline-block rounded-[1rem]"
            }  `}>
            {message.text}
          </p>
        </div>
      </div>
    </>
  );
};

export default Message;
