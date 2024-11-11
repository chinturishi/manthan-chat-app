import "./left-sidebar.css";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase.config";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const {
    userData,
    chatData,
    chatUser,
    setChatUser,
    setMessagesId,
    messagesId,
  } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (event) => {
    console.log("Leftside bar input handler");
    try {
      const input = event.target.value;
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, "users");
        //const q = query(userRef, where("username", "==", input.toLowerCase()));
        const q = query(
          userRef,
          where("username", ">=", input.toLowerCase()),
          where("username", "<=", input.toLowerCase() + "\uf8ff")
        );
        const querySnapshot = await getDocs(q);
        console.log("chat data");
        //console.log(userData.id);
        if (
          !querySnapshot.empty &&
          querySnapshot.docs[0].data().id !== userData.id
        ) {
          let userExists = false;
          chatData.map((user) => {
            console.log(user.rid);
            console.log(querySnapshot.docs[0].data().id);
            if (user.rid === querySnapshot.docs[0].data().id) {
              userExists = true;
            }
          });
          if (!userExists) {
            setUser(querySnapshot.docs[0].data());
          }
        } else {
          setUser(null);
        }
      } else {
        setShowSearch(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", err.message);
    }
  };

  const addChat = async () => {
    console.log("Leftside bar add");
    const messagesRef = collection(db, "messages");
    const chatRef = collection(db, "chats");
    console.log(messagesRef);
    console.log(chatRef);
    try {
      const newMessagesRef = doc(messagesRef);
      await setDoc(newMessagesRef, {
        createAt: serverTimestamp(),
        message: [],
      });
      await updateDoc(doc(chatRef, user.id), {
        chatsData: arrayUnion({
          messages: newMessagesRef.id,
          lastMessage: "",
          rid: userData.id,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });

      await updateDoc(doc(chatRef, userData.id), {
        chatsData: arrayUnion({
          messages: newMessagesRef.id,
          lastMessage: "",
          rid: user.id,
          updatedAt: Date.now(),
          messageSeen: true,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const setChat = async (item) => {
    console.log(item)
    setMessagesId(item.messages);
    setChatUser(item);
  };
  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="" className="logo" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className="sub-menu">
              <p onClick={() => navigate("/profile")}>Edit Profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input
            type="text"
            placeholder="Search here.."
            onChange={inputHandler}
          />
        </div>
      </div>
      <div className="ls-list">
        <>
          {showSearch && user ? (
            <div className="friends add-user" onClick={addChat}>
              <img src={user.avatar} alt="" />
              <p>{user.name}</p>
            </div>
          ) : (
            chatData.map((item, index) => (
              <div className="friends" key={index} onClick={()=>setChat(item)}>
                <img src={item.userData.avatar} alt="" />
                <div>
                  <p>{item.userData.name}</p>
                  <span>{item.lastMessage}</span>
                </div>
              </div>
            ))
          )}
        </>
      </div>
    </div>
  );
};

export default LeftSidebar;
