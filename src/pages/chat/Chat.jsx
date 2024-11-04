import LeftSidebar from '../../components/left-sidebar/LeftSidebar'
import ChatBox from '../../components/chat-box/ChatBox'
import RightSidebar from '../../components/right-sidebar/RightSidebar'
import './Chat.css'

const Chat = () => {
  return (
    <div className='chat'>
      <div className="chat-container">
        <LeftSidebar />
        <ChatBox/>
        <RightSidebar/>
      </div>
    </div>
  )
}

export default Chat