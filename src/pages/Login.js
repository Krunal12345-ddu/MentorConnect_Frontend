import React,{useState} from 'react'
import {useNavigate,Link} from 'react-router-dom';
import './Login.css';
import { useAuth } from '../contexts/AuthContext';
const Login = () => {
  const [email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const {login} = useAuth();
  const navigate= useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    const userData= {email,role:'student'} ;  //dummy data
    login(userData);  
    navigate('/');
  }
  return (
    <div className='login-page'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email"
         placeholder="Email"
         value={email} 
         onChange={(e)=>setEmail(e.target.value)}
         required/>
         
         <input type="password"
         placeholder="Password"
         value={password} 
         onChange={(e)=>setPassword(e.target.value)}
         required/>

         <button type="submit">Login</button>

      </form>
      <div className='signup-link'>
         <p>Dont have an account?<Link to="/signup">Sign up</Link></p>
      </div>
      
    </div>
  )
}

export default Login