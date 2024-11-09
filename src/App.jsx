import { Route, Routes, useNavigate } from "react-router-dom"
import Login from "./pages/login/Login"
import Chat from "./pages/chat/Chat"
import Profile from "./pages/profile/Profile"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase.config";
import { AppContext } from "./context/AppContext";


const App = () => {
  const navigate =useNavigate();
  const {loadUserData} =useContext(AppContext);
  useEffect(()=>{
    console.log("App useEffect");
    onAuthStateChanged(auth,async (user)=>{
      if(user){
        navigate('/chat');
        await loadUserData(user.uid);
      }else{
        navigate('/');
      }
    })
  },[])
  return (
   <>
   <ToastContainer/>
   <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/chat" element={<Chat/>} />
    <Route path="/profile" element={<Profile/>}/>
   </Routes>
   </>
  )
}

export default App