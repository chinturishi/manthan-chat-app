import { Route, Routes } from "react-router-dom"
import Login from "./pages/login/Login"
import Chat from "./pages/chat/Chat"
import Profile from "./pages/profile/Profile"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
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