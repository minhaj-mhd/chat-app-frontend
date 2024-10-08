import React,{useEffect, useState,useRef}from 'react'
import Messages from "./Messages"
import "./ChatArea.css"
import MessageInput from './MessageInput'
import getTokenFromCookies from '../utils/getToken'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from 'emoji-picker-react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import zIndex from '@mui/material/styles/zIndex'

function ChatArea({chat_user}) {
  const [wsInstance, setWsInstance] = useState(null)
  const [inputValue, setinputValue] = useState()
  const [messagesdata, setMessagesdata] = useState([]);  // To store all sent and received messages
  const [emojiOpen, setemojiOpen] = useState(false)
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setemojiOpen(false); // Close emoji picker
      }
    };
        // Add event listener when emoji picker is open
        if (emojiOpen) {
          document.addEventListener('mousedown', handleClickOutside);
        }
    
        // Clean up the event listener when component unmounts or emojiOpen changes
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [emojiOpen]);
    

  useEffect(() => {
    const token = getTokenFromCookies()
    
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${chat_user}/?token=${token}`);
    setMessagesdata([])
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

  const onEmojiClickfn =(emojiObject,event)=>{
    console.log(emojiObject.emoji)
    console.log(emojiObject)
    setinputValue(inputValue+emojiObject.emoji)
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
            <div key={obj.id} className="">{obj.receiver===chat_user?<Messages text={obj.text} sent/>: <Messages text={obj.text} />} </div>))}
          
           
            
            
        </div>
        <div ref={emojiPickerRef}className='emoji-select' sx={{zIndex:"10"}}>
          <EmojiPicker open={emojiOpen} onEmojiClick={onEmojiClickfn}/>
          </div>
        <div className="input-area">
        
        <div className="message-input" >
          <TextField id="standard-basic" label="Type your message." variant="standard" value={inputValue} className='text-input'
          onChange ={(e)=>setinputValue(e.target.value)} sx={{width:"70%"}}/> 
          
          <div className="buttons">
          
          <Button onClick={()=>setemojiOpen(!emojiOpen)} className='item'>
            <EmojiEmotionsIcon/>
          </Button>

          <Button className='item' variant="contained" endIcon={<SendIcon />}  onClick={sendMessages}>
          Send
          </Button>
          </div>
        </div>
        </div>
    </div>
  )
}

export default ChatArea