import { Route, Routes } from "react-router-dom"
import Login from "./pages/login/Login"
import Chat from "./pages/chat/Chat"
import Profile from "./pages/profile/Profile"


const App = () => {
  return (
   <>
   <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/chat" element={<Chat/>} />
    <Route path="/profile" element={<Profile/>}/>
   </Routes>
   </>
  )
}

export default App