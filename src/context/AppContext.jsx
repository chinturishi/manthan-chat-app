import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);
  const navigate = useNavigate();
  const [messagesId, setMessagesId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatUser, setChatUser] = useState(null);

  useEffect(() => {
    console.log("Appcontext useEffect");
    if (userData) {
      const chatRef = doc(db, "chats", userData.id);
      const unSub = onSnapshot(chatRef, async (res) => {
        console.log("response", res.data());
        const chatItems = res.data().chatsData;
        const tempData = [];
        for (const chatItem of chatItems) {
          const userRef = doc(db, "users", chatItem.rid);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data();
          tempData.push({ ...chatItem, userData });
        }
        setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
      });
      return () => {
        unSub();
      };
    }
  }, [userData]);

  const loadUserData = async (uid) => {
    console.log("Appcontext loaduserdata");
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      setUserData(userData);
      if (userData.avatar && userData.name) {
        navigate("/chat");
      } else {
        navigate("/profile");
      }
      await updateDoc(userRef, { lastSeen: Date.now() });
      setInterval(async () => {
        if (auth.chatUser) await updateDoc(userRef, { lastSeen: Date.now() });
      }, 60000);
    } catch (e) {
      console.log(e);
    }
  };
  const values = {
    userData,
    setUserData,
    chatData,
    setChatData,
    loadUserData,
    messages,
    setMessages,
    messagesId,
    setMessagesId,
    chatUser,
    setChatUser,
  };
  return (
    <AppContext.Provider value={values}>{props.children})</AppContext.Provider>
  );
};

export default AppContextProvider;
