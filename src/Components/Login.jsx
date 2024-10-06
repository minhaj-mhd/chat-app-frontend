import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

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
      throw new Error('Network response was not ok');
      setSuccess(false)

    }
    const data = await response.json();
    const token=data.token
    document.cookie=`token=${token}`
    navigate("/")
      console.log(token)
        setResponseMessage(`Login successfull`);
        setSuccess(true)


    }
      catch(error){
        setResponseMessage("Invalid credentials");
        setSuccess(false)
        navigate("/")
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