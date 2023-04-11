function ChatList({ chatUser, onSecteUser }: any) {
  return (
    <>
      <div
        onClick={onSecteUser(chatUser)}
        className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer  ">
        {chatUser?.recipianImg ? (
          <img
            src={chatUser?.recipianImg}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-white rounded-full"></div>
        )}

        <div>
          {/* display user fullname if exist else use the username */}
          <p className="font-semibold">
            {chatUser?.recipianFullName
              ? chatUser?.recipianFullName
              : chatUser?.recipianUsername}
          </p>
          <p className="text-gray-400 text-[13px]"></p>
        </div>
      </div>
    </>
  );
}

export default ChatList;
