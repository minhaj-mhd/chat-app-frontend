import React,{useState,useEffect} from 'react'
import Button from '@mui/material/Button';

import api from '../utils/axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
function FriendRequests() {
    const [data, setdata] = useState([])
    useEffect(() => {
    
    fetchData();
    
    }, [])

    const fetchData =async()=>{
        try{
            const response = await api.get("friends/friendrequests/");
            setdata(response.data)


            
        }catch{
            console.log("error in fetching data")
        }
    }



    const handleAccept = async(id)=>{
        const response = await api.post("friends/acceptrequest/",{
            friend:id,status:"accepted"
        });
            fetchData();
    }
    const listComponent={}
  return (
    
    
    <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
                <Typography variant="body1" style={{ fontSize: '1rem' }}> {/* Adjust font size here */}
            Friend Requests
            </Typography>
    
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
                    <Button variant="contained"  sx={{width:"10%"}}  onClick={()=>
                            handleAccept(item.id)} >Accept
                    </Button>
                    </ListItem>
                    <Divider variant="inset" component="li" />
    
                    </div>
                ))}
            </List>
           }

      </Box>
  )
}

export default FriendRequests