import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import api from '../utils/axios';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [responseMessage, setResponseMessage] = useState(null);
    const navigate = useNavigate()
    const [success, setSuccess] = useState(false)

    const handleSubmit =async(e)=>{
      e.preventDefault()
      const BASE_URL="http://localhost:8000/accounts/"
      try{const response = await fetch(`${BASE_URL}login`,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({email,password}
      )
      }
    );
    if (!response.ok) {
      setSuccess(false)
      throw new Error('Network response was not ok');
      

    }
    const data = await response.json();
    const token=data.token
    const user = data.user
    console.log(user)
    console.log(data.name)
    document.cookie=`token=${token}`
    api.defaults.headers.common['Authorization']=`Bearer ${token}`
     console.log(document.cookie)
      setResponseMessage(`Login successfull`);
      console.log("login successful")
      setSuccess(true)
      navigate("/")



    }
      catch(error){
        setResponseMessage("Invalid credentials");
        setSuccess(false)
      }
    }
  return (
    <div className='container'>
    <TextField className='mt-5' id="standard-basic" label="Email" variant="standard" onChange={(e)=>setEmail(e.target.value)}></TextField> <br />
    <TextField id="standard-basic" label="Password" variant="standard"onChange={(e)=>setPassword(e.target.value)}/>  <br />
    { responseMessage ? responseMessage &&success ? <Alert  severity="success">{responseMessage}</Alert>: <Alert  severity="error">{responseMessage}</Alert>: ""}

    <br />
    <Button className='mt-3'  variant="outlined" href="#outlined-buttons" onClick={handleSubmit}>
    LogIn
  </Button><br />
  <Link className='mt-3' href="#" onClick={(e) => { e.preventDefault();navigate("/register");}}>Doesn't have an account?Sign Up!</Link>

 </div>
  )
}

export default Login