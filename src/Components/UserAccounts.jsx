import React, { useEffect, useState } from 'react'
import api from '../utils/axios'
import './UserAccounts.css'
//material ui imports

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

function UserAccounts( {onValueChange}) {
    const [data, setdata] = useState([])
    useEffect(() => {
    const fetchData =async()=>{
        try{
            const response = await api.get("friends/list/");
            setdata(response.data)


            
        }catch{
            console.log("error in fetching data")
        }
    }
    fetchData();
    
    }, [])

    const handleClick = (item) =>{
        onValueChange(item)
    }
    
  return (
    <div className='user-accounts'>
 
        {  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>


                {data.map((item,index) => (
                    <div className="" key={index}>
                    <ListItem >
                    <ListItemAvatar>
                        <Avatar >{item.first_name[0]}</Avatar> 
                    </ListItemAvatar>
                    <ListItemText primary={item.first_name} value={item.id} onClick={()=>handleClick({"id":item.id,"first_name":item.first_name,"last_name":item.last_name})} secondary={
                    <Typography variant="body2" style={{ fontSize: '0.75rem' }}> {/* Adjust font size here */}
                    {item.email}
                    </Typography> }/>
                    </ListItem>
                    <Divider variant="inset" component="li" />

                    </div>
                ))}
            </List>
           }
</div>
  )
}

export default UserAccounts