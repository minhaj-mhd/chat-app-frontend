import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SideBar from './Components/SidebarMaterial';
function App() {
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
