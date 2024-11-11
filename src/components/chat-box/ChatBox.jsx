import "./chat-box.css";
import assets from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase.config";
import { toast } from "react-toastify";

const ChatBox = () => {
  const { userData, chatUser, messagesId, setMessages, messages } =
    useContext(AppContext);
  const [input, setInput] = useState("");
  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        setMessages(res.data().messages.reverse());
      });
      return () => {
        unSub();
      };
    }
  }, [messagesId]);

  const sendMessage = async () => {
    console.log("send message");
    try {
      if (input && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date(),
          }),
        });
        const userIds = [chatUser.rid, userData.id];
        userIds.forEach(async (id) => {
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);
          if (userChatsSnapshot.exists()) {
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex(
              (c) => c.messages === messagesId
            );
            userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSee = false;
            }
            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData,
            });
          }
        });
      }
    } catch (e) {
      toast.error(e.message);
    }
    setInput("");
  };

  const convertTimeStamp = (timeStamp) => {
    let date = timeStamp.toDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero if needed
    return `${adjustedHours}:${formattedMinutes} ${ampm}`;
  };

  return chatUser ? (
    <div className="chat-box">
      <div className="chat-user">
        <img src={chatUser.userData.avatar} alt="" />
        <p>
          {chatUser.userData.name}
          <img src={assets.green_dot} className="dot" />
        </p>
        <img src={assets.help_icon} alt="" className="help" />
      </div>

      <div className="chat-msg">
        {messages.map((msg, index) => {
          return (
            <div
              className={msg.sId === userData.id ? "s-msg" : "r-msg"}
              key={index}
            >
              <p className="msg">{msg.text}</p>
              <div>
                <img
                  src={
                    msg.sId === userData.id
                      ? userData.avatar
                      : chatUser.userData.avatar
                  }
                  alt=""
                />
                <p>{convertTimeStamp(msg.createdAt)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Send a message"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <input type="file" id="image" accept="image/png, image/jpeg" hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" onClick={sendMessage} />
      </div>
    </div>
  ) : (
    <div className="chat-welcome">
      <img src={assets.logo_icon} alt="" />
      <p>Click on a chat to start messaging</p>
    </div>
  );
};

export default ChatBox;
