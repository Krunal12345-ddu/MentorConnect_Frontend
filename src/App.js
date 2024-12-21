import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/HomePage'
import { AuthProvider, useAuth} from './contexts/AuthContext';
const ProtectedRoute = ({ children }) => {
const { auth} = useAuth();
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
    </Routes>
 </Router>
</AuthProvider>
)
}

export default App;