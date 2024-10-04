 import React from 'react'
 import TextField from '@mui/material/TextField';
 import Button from '@mui/material/Button';

 function Register() {
   return (
     <div className='container'>
        <TextField className='mt-5' id="standard-basic" label="Email" variant="standard"></TextField> <br />
        <TextField id="standard-basic" label="First Name" variant="standard"/>  <br />
        <TextField id="standard-basic" label="Last Name" variant="standard"/>  <br />
        <TextField id="standard-basic" label="Password" variant="standard"/>  <br />
        <Button className='mt-5' variant="outlined" href="#outlined-buttons">
        SignIn
      </Button>
     </div>
   )
 }
 
 export default Register