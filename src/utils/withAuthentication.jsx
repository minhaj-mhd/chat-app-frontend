import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function withAuthentication(WrappedComponent) {
  return function WithAuth(props) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const token = document.cookie.split("; ").find(row => row.startsWith('token='));
      if (token) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        navigate('/login'); // Redirect to login if not authenticated
      }
    }, [navigate]);

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else {
      return null; // or a loading spinner while redirecting
    }
  };
}

export default withAuthentication;
