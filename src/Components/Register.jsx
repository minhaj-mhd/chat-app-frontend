 import React,{useState} from 'react'
 import TextField from '@mui/material/TextField';
 import Button from '@mui/material/Button';
 import Alert from '@mui/material/Alert';
 import { useNavigate } from 'react-router-dom';
 import Link from '@mui/material/Link';
 import config from "../config"
 function Register() {
  const [email, setEmail] = useState("")
  const [first_name, setfirst_name] = useState("")
  const [last_name, setlast_name] = useState("")
  const [password, setPassword] = useState("")
  const [responseMessage, setResponseMessage] = useState("");
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const handleSubmit =async(e)=>{
    e.preventDefault()
    try{const response = await fetch(`${config.apiUrl}/accounts/register`,{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({email,first_name,last_name,password}
    )
    }
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
    setSuccess(false)

  }
  const data = await response.json();
      setResponseMessage(`User created successfully`);
      setSuccess(true)
      navigate("/login");

  }
    catch(error){
      setResponseMessage(`Error: ${error.message}`);
      setSuccess(false)

    }


    
  }
   return (
     <div className='container'>
        <TextField className='mt-5' id="standard-basic" label="Email" variant="standard" onChange={(e)=>setEmail(e.target.value)}></TextField> <br />
        <TextField id="standard-basic" label="First Name" variant="standard" onChange={(e)=>setfirst_name(e.target.value)}/>  <br />
        <TextField id="standard-basic" label="Last Name" variant="standard" onChange={(e)=>setlast_name(e.target.value)}/>  <br />
        <TextField id="standard-basic" label="Password" variant="standard"onChange={(e)=>setPassword(e.target.value)}/>  <br />
        { responseMessage ? responseMessage &&success ? <Alert  severity="success">{responseMessage}</Alert>: <Alert  severity="error">{responseMessage}</Alert>: ""}
        <Button className='mt-3' variant="outlined" href="#outlined-buttons" onClick={handleSubmit}>
        SignIn
      </Button><br />
      <Link href="#" onClick={(e) => { e.preventDefault();navigate("/login");}}>Have an account?Login!</Link>

     </div>
   )
 }
 
 export default Register