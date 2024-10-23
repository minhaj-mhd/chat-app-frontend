import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Components/UserContext';
import getTokenFromCookies from './getToken';

import api from './axios';
function withAuthentication(WrappedComponent) {

  return function WithAuth(props) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();
    const { user,setUser } = useUser();  // Access setUser from UserContext to store logged-in user details

    useEffect(() => {
      const token = getTokenFromCookies();
        if (token!=null){
        
    

      const verify = async ()=>{
        const userData = await api.get("api/verify/");
      if (userData.data) {
        setAuthenticated(true);
        setUser(userData.data)
      } else {
        setAuthenticated(false);
        navigate('/login'); // Redirect to login authenticated
      }

      }
      
      verify()
    }else{
      navigate("/login")
    }
      
    }, [navigate,setUser]);

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return null; // or a loading spinner while redirecting
    }
  };
}

export default withAuthentication;
