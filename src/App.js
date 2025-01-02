import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage'
import { AuthProvider, useAuth} from './contexts/AuthContext';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/ReactToastify.css';
import ProfilePage from './pages/ProfilePage';



const ProtectedRoute = ({ children }) => {
const { auth, login} = useAuth();
const [loading, setLoading] = useState(true); // loading status while checking auth
const navigate = useNavigate();

useEffect(()=>{
  const checkLoginStatus = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/checklogin`, {
        method: 'GET',
        credentials: 'include', // Include cookies for the auth token
      });
      const data = await response.json();
      if(response.ok && data.ok){
        login({userId: data.userId});
        setLoading(false);
      }
      else{
        toast.error(data.message || 'Session expired. Please log in again.');
        navigate('/login');
      }
    }
    catch(error){
      toast.error('Error checking login status.');
      navigate('/login');
    }
    finally {
      setLoading(false);
    }
  }
  checkLoginStatus();
}, [navigate])

if(loading){
  return <div>Loading...</div>; // add spinner or loading indicator here
}
return auth.user? children: <Navigate to='/login' />;

}
  

const App = () => {
return(
<AuthProvider>
  <Router>
    <Navbar /> 
    <Routes>
     <Route path="/login" element={<Login/>}/>
     <Route path="/signup" element={<Signup/>}/>
     <Route path="/" element={
      <ProtectedRoute>
        <HomePage/>

      </ProtectedRoute>
     }/>
     <Route path="/profile" element={
      <ProtectedRoute>
        <ProfilePage/>
      </ProtectedRoute>
     }/>
     
    </Routes>
    <ToastContainer/>
 </Router>
</AuthProvider>
)
}

export default App;