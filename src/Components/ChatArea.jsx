import React from 'react'
import Messages from "./Messages"
import "./ChatArea.css"
import MessageInput from './MessageInput'
function ChatArea() {
  return (
    <div className="chat-area" >
        <div className="messages">
            <Messages text="hai" sent/>
            <Messages text="hello"/>
            
        </div>
        <div className="input-area">
        <MessageInput/>
        </div>
    </div>
  )
}

export default ChatArea