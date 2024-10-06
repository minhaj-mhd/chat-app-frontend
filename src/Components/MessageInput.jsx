import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import SendIcon from '@mui/icons-material/Send';

function MessageInput() {
const [inputValue, setinputValue] = useState()
const handleInput =()=>{   console.log(inputValue)
    setinputValue("")
}
  return (
    <div className="message-input">
     <TextField id="standard-basic" label="Type your message." variant="standard" value={inputValue}
       onChange ={(e)=>setinputValue(e.target.value)} sx={{width:"60%"}}/>
     <Button variant="contained" endIcon={<SendIcon />} sx={{width:"10%"}} onClick={handleInput}>
        Send
      </Button>
    </div>
  )
}

export default MessageInput