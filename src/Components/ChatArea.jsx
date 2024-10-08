import React,{useEffect, useState}from 'react'
import Messages from "./Messages"
import "./ChatArea.css"
import MessageInput from './MessageInput'
import getTokenFromCookies from '../utils/getToken'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import SendIcon from '@mui/icons-material/Send';


function ChatArea({chat_user}) {
  const [wsInstance, setWsInstance] = useState(null)
  const [inputValue, setinputValue] = useState()
  const [messagesdata, setMessagesdata] = useState([]);  // To store all sent and received messages

  useEffect(() => {
    const token = getTokenFromCookies()
    
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${chat_user}/?token=${token}`);
    socket.onopen = () => {
      console.log('WebSocket connection established');
    };
    setWsInstance(socket);
    socket.onmessage = (event) => {
      console.log('Message received:', event.data);
      const data = JSON.parse(event.data); // Assuming the server sends a JSON message
      setMessagesdata((prevMessages) => [...prevMessages, { text: data.message,receiver:data.receiver ,sent: false }]);

      console.log(data.message)
    };
    socket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    socket.onclose = (event) => {
      console.log('WebSocket connection closed', event);
      
    };

    return () => {
      socket.close(); // Cleanup when component unmounts
    };
  },[chat_user])

  const sendMessages = () =>{

      const messageData = { message: inputValue,receiver:chat_user };

      wsInstance.send(JSON.stringify(messageData))

      console.log("send message:",inputValue)
      setinputValue("")
    
  }


  const [messages,setMessages] = useState("")
  const handleSendMessage = (value)=>{
    setMessages(value)
    console.log(messages)
  }
  
  return (
    <div className="chat-area" >
        <div className="messages">

          {messagesdata.map((obj)=>(
            <div className="">{obj.receiver===chat_user?<Messages text={obj.text} sent/>: <Messages text={obj.text} />} </div>))}
          
           
            
            
        </div>
        <div className="input-area">
        <div className="message-input">
     <TextField id="standard-basic" label="Type your message." variant="standard" value={inputValue}
       onChange ={(e)=>setinputValue(e.target.value)} sx={{width:"60%"}}/>
     <Button variant="contained" endIcon={<SendIcon />} sx={{width:"10%"}} onClick={sendMessages}>
        Send
      </Button>
    </div>
        </div>
    </div>
  )
}

export default ChatArea