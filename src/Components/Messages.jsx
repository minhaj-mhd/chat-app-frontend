import React from 'react'
import "./Messages.css"
import MessageInput from './MessageInput'
function Messages({text,sent}) {
  return (
    <div className="messages"  >
    <div className={`message ${sent?'sent':'recieve'}`} >
        <div className="message-bubble">{text}</div>
    </div>
    </div>
  )
}

export default Messages