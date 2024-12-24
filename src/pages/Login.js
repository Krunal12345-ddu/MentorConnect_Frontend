import React,{useState} from 'react'
import {useNavigate,Link} from 'react-router-dom';
import './Login.css';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
const Login = () => {
  const [email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const {login} = useAuth();
  const navigate= useNavigate();
  const [loading,setLoading]=useState(false);

 const handleSubmit= async (e)=>{
   e.preventdefault();
    if(!email||!password){
     toast.error('All fields are required');
     return;
    }
    setLoading(true);
    try{
      
         const response=await fetch('${process.env.REACT_APP_API_BASE_URL}/auth/login',{
           method:'POST',
           headers:{
             'Content-Type':'application/json',
           },
           body:JSON.stringify({email,password}),
           credentials:'include', //include cookies for cors
         });
 
         const data= await response.json();
         if(response.ok){
           toast.success("LOgged in successfully");
 
           login(data.user);
           navigate('/');
         }
         else{
           toast.error(data.message ||"login failed");
         }
 
     }
     catch(error){
       toast.error("Error during login");
 
     }
     finally{
       setLoading(false);
     }
   
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