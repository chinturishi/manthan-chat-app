import './right-sidebar.css'
import assets from '../../assets/assets'
import { logout } from '../../config/firebase.config'
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";

const RightSidebar = () => {
  const {
    userData,
    chatData,
    chatUser,
    setChatUser,
    setMessagesId,
    messagesId,
    messages
  } = useContext(AppContext);

  const [msgImages,setMsgImages]=useState([]);

  useEffect(()=>{
    let temVar = [];
    console.log('Messssssssssssssss',messages);
    messages.forEach((msg)=>{
      if(msg.image){
        temVar.push(msg.image);
        console.log(msg.image)
      }
    })
    setMsgImages(temVar);
    console.log(msgImages);
  },[messages])

  return chatUser ?(
    <div className='rs'>
      <div className="rs-profile">
        <img src={chatUser.userData.avatar} alt="" />
        <h3>{chatUser.userData.name} <img src={assets.green_dot} className='dot'/></h3>
        <p>{chatUser.userData.bio}</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          {msgImages.map((url,index)=>{
            return (<img src={url} alt=""  key={index} onClick={()=>window.open(url)}/>)
          })}
        </div>
      </div>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  ):<div className='rs'>
     <button onClick={()=>logout()}>Logout</button>
    </div>

}

export default RightSidebar