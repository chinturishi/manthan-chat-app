import LeftSidebar from "../../components/left-sidebar/LeftSidebar";
import ChatBox from "../../components/chat-box/ChatBox";
import RightSidebar from "../../components/right-sidebar/RightSidebar";
import "./chat.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Chat = () => {
  const { chatData, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (chatData && userData) {
      setLoading(false);
    }
  }, [chatData, userData]);
  return (
    <div className="chat">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="chat-container">
          <LeftSidebar />
          <ChatBox />
          <RightSidebar />
        </div>
      )}
    </div>
  );
};

export default Chat;
