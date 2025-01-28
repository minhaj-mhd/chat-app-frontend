import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import api from '../utils/axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import config from '../config';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [responseMessage, setResponseMessage] = useState(null);
    const navigate = useNavigate()
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    const handleSubmit =async(e)=>{
      e.preventDefault()
      const BASE_URL=`${config.apiUrl}/accounts/`
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
      console.log(response)
      throw new Error('Network response was not ok');
      

    }
    const data = await response.json();
    const token=data.token
    const user = data.user

    document.cookie=`token=${token}`
    api.defaults.headers.common['Authorization']=`Bearer ${token}`
      setResponseMessage(`Login successfull`);
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

    <TextField  id="standard-basic" label="Email" sx= {{ml:1,mt:5,}	} variant="standard" onChange={(e)=>setEmail(e.target.value)}></TextField> <br />
    {/* <TextField id="standard-basic" label="Password" type ="password" variant="standard"/>  <br /> */}
    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">

    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e)=>setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

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