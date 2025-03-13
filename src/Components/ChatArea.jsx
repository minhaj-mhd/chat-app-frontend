import React, { useEffect, useState, useRef } from 'react';
import Messages from "./Messages";
import "./ChatArea.css";
import getTokenFromCookies from '../utils/getToken';
import { useUser } from './UserContext';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import config from "../config";
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from 'emoji-picker-react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

function ChatArea() {
  const [wsInstance, setWsInstance] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [messagesData, setMessagesData] = useState([]); 
  const [emojiOpen, setEmojiOpen] = useState(false);
  const emojiPickerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { chatWithUser } = useUser();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setEmojiOpen(false);
      }
    };

    if (emojiOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emojiOpen]);

  useEffect(() => {
    const token = getTokenFromCookies();
    const socket = new WebSocket(`${config.webSocekUrl}/ws/chat/${chatWithUser.id}/?token=${token}`);

    setMessagesData([]);

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    setWsInstance(socket);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessagesData((prevMessages) => [
        ...prevMessages,
        { text: data.message, reciever: data.reciever, sent: false },
      ]);
    };

    socket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    socket.onclose = (event) => {
      console.log('WebSocket connection closed', event);
    };

    return () => {
      socket.close();
    };
  }, [chatWithUser]);

  // ✅ Scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesData]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const messageData = { message: inputValue, reciever: chatWithUser.id };
    wsInstance.send(JSON.stringify(messageData));

    // setMessagesData((prevMessages) => [
    //   ...prevMessages,
    //   { text: inputValue, reciever: chatWithUser.id, sent: true }
    // ]);

    setInputValue('');
  };

  const handleEmojiClick = (emojiObject) => {
    setInputValue((prev) => prev + emojiObject.emoji);
  };

  return (
    <div className="chat-area">
      <div className="messages">
        {messagesData.map((obj, index) => (
          <div key={index} className="">
            {obj.reciever === chatWithUser.id ? (
              <Messages text={obj.text} sent />
            ) : (
              <Messages text={obj.text} />
            )}
          </div>
        ))}
        {/* Empty div to scroll to bottom */}
        <div ref={messagesEndRef} />
      </div>

      <div ref={emojiPickerRef} className="emoji-select">
        {emojiOpen && <EmojiPicker onEmojiClick={handleEmojiClick} />}
      </div>

      <div className="input-area">
        <div className="message-input">
          <TextField
            label="Type your message..."
            variant="standard"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{ width: '70%' }}
          />
          <div className="buttons">
            <Button onClick={() => setEmojiOpen(!emojiOpen)}>
              <EmojiEmotionsIcon />
            </Button>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={sendMessage}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
