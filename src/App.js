import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SideBar from './Components/HomeLayout';
import config from './config';
function App() {
  const BASE_URL = `${config.apiUrl}/accounts/`;

    
    useEffect(() => {
      const checkAccount = async () => {
        try {
          const response = await fetch(`${BASE_URL}check`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log(response.data)
        }catch(error){
            console.error()
          };
      }
      checkAccount();
    }, [])
  

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/"  element={<SideBar/>}/>
      </Routes>
    </Router>
  );
}

export default App;
