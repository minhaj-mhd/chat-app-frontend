import React,{useState,useContext} from 'react'
import { useUser } from './UserContext';
import api from '../utils/axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
function SearchUsers() {

    const [data, setdata] = useState([])
    const [addData, setAddData] = useState([])
    const [inputValue, setinputValue] = useState("")
    const [friend,setFriend]=useState()
    const {chatWithUser,setchatWithUser} = useUser()
    const fetchData =async()=>{
        try{
            const response = await api.get("friends/users/",{
                params: { q: inputValue }
              });
            console.log(response.data)
            setdata(response.data)


            
        }catch{
            console.log("error in fetching data")
        }
    }
   

    const handleSearch = () =>{
        fetchData()
    }

    const handleAdd=async(id)=>{
        const response = await api.post("friends/add/", {
            friend: id,
          });
        console.log(response.data)
        setAddData(response.data)
        fetchData();
    }
    const handleclose =()=>{
        setdata([])
    }
      return (
        <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        
        <TextField id="standard-basic" label="Enter the name or email" variant="standard" value={inputValue} onChange={(e)=>{setinputValue(e.target.value)}}/>
        <div className="search-close" sx={{display:"flex"}}>
        <Button variant="contained" endIcon={<SearchIcon />} sx={{}} onClick={handleSearch}>Search
      </Button>
      <Button variant="contained"  sx={{backgroundColor:"red"}} onClick={handleclose}>close
      </Button></div>
      {  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {data.map((item,index) => (
                    <div className="" key={index}>
                    <ListItem >
                    <ListItemAvatar>
                        <Avatar >{item.first_name[0]}</Avatar> 
                    </ListItemAvatar>
                    <ListItemText primary={item.first_name} value={item.id} 
                    // onClick={()=>handleClick({"id":item.id,"first_name":item.first_name,"last_name":item.last_name})} 
                    secondary={
                    <Typography variant="body2" style={{ fontSize: '0.75rem' }}> {/* Adjust font size here */}
                    {item.email}
                    </Typography> }/>
                    {item.friendship_status==="None"?<Button variant="contained"  sx={{width:"10%"}} onClick={()=>
                        handleAdd(item.id)}>Add
                    </Button>:item.friendship_status==="pending"?<Button variant="contained"  sx={{width:"10%"}} onClick={()=>
                        {}}>Cancel
                    </Button>:<Button variant="contained"  sx={{width:"10%"}} onClick={()=>
                        {setchatWithUser(item)}}>chat
                    </Button>}
                    
                    </ListItem>
                    <Divider variant="inset" component="li" />

                    </div>
                ))}
            </List>
           }

      </Box>
  )
}

export default SearchUsers