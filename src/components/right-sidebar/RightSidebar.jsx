import './right-sidebar.css'
import assets from '../../assets/assets'
import { logout } from '../../config/firebase.config'
import { AppContext } from "../../context/AppContext";
import { useContext, useState } from "react";

const RightSidebar = () => {
  const {
    userData,
    chatData,
    chatUser,
    setChatUser,
    setMessagesId,
    messagesId,
  } = useContext(AppContext);
  return (
    <div className='rs'>
      <div className="rs-profile">
        <img src={userData.avatar} alt="" />
        <h3>{userData.name} <img src={assets.green_dot} className='dot'/></h3>
        <p>Hey, There I am Rishi using the Manthan app</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>
      </div>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  )
}

export default RightSidebar