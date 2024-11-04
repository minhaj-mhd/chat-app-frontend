import * as React from 'react';
import { useContext } from 'react';
import {useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
import ChatArea from './ChatArea';
import UserAccounts from './UserAccounts';
import withAuthentication from '../utils/withAuthentication';
import Cookies from 'js-cookie';
import api from '../utils/axios';
import  {DrawerHeader,AppBar,Main} from "./NavbarHelperFns"
import Welcome from './Welcome';
import SearchUsers from './SearchUsers';
import FriendRequests from './FriendRequests';
import { useUser } from './UserContext';
const drawerWidth = 300;



 function HomeLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const {chatWithUser,setchatWithUser,user,setUser} = useUser();
  const navigate = useNavigate();

  const handleIdchange = (value)=>{
    setchatWithUser(value)
    console.log(value)
    console.log(chatWithUser)
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Logout=()=>{
    const cookies = Cookies.get(); // Get all cookies
      for (const cookieName in cookies) {
        Cookies.remove(cookieName); // Remove each cookie
      }
      console.log('All site cookies cleared!');
      console.log(document.cookie)
      delete api.defaults.headers.common['Authorization'];

    navigate("/login")
  }

      
    

  return (
    <div className="container" >
     
    <Box sx={{ display: 'flex' ,}}>
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar  >

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{ mr: 2 }, open && { display: 'none' }]}
          > 
            <MenuIcon />
          </IconButton>
          {chatWithUser.first_name}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
        {user.first_name}

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider/>
        <SearchUsers/>
        <Divider/>
        <FriendRequests/>
        <UserAccounts onValueChange = {handleIdchange}/>
        <Divider sx={{ position: 'relative', marginTop: '100px', width: '100%' }}/>

        <Button variant="outlined" onClick={Logout} sx={{borderColor:"red", color:"red", width: '100%' }}>Logout</Button>
        
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        {chatWithUser.id===0?<Welcome></Welcome>:<ChatArea />}
       

      </Main>
    </Box>
    
    </div>
  );
  
}
export default withAuthentication(HomeLayout)