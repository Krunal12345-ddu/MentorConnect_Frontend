import React,{useState} from 'react'
import {useNavigate,Link} from 'react-router-dom';
import './Signup.css';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
const Signup = () => {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[otp,setOtp]=useState('');
  const[role,setRole]=useState('Student');
  const[loading,setLoading]=useState(false);

  const {login}=useAuth();
  const navigate=useNavigate();

  const handleSubmit= async (e)=>{
  e.preventDefault();
   if(!name||!email||!password||!otp){
    toast.error('All fields are required');
    return;
   }
   try{
        setLoading(true);
        const response=await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({name,email,password,otp,role}),
          credentials:'include', //include cookies for cors
        });

        const data= await response.json();
        if(response.ok){
          toast.success("OTP sent successfully");

          login({email,role});
          navigate('/');
        }
        else{
          toast.error(data.message ||"Registration failed");
        }

    }
    catch(error){
      toast.error("Error during registration");

    }
    finally{
      setLoading(false);
    }
  
  }
  
  const handleSendOtp= async ()=>{
    if(!email){
      toast.error('Please enter valid email');
      return;
    }
    
  try{
    setLoading(true);
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/sendotp`, {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({email}),
          credentials:'include', //include cookies for cors
        });

        const data= await response.json();
        if(response.ok){
          toast.success("OTP sent successfully");
        }

      }
      catch(error){
      toast.error('Error sending OTP');
      }
      finally{
        setLoading(false);
      }
  }

  return (
    <div className='signup-page'>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
      <input type="text"
         placeholder="Name"
         value={name} 
         onChange={(e)=>setName(e.target.value)}
         required/>

         <div className='email-otp-container'>
        <input type="email"
         placeholder="Email"
         value={email} 
         onChange={(e)=>setEmail(e.target.value)}
         required/>
         
         <button type="button" onClick={handleSendOtp} className='send-otp-btn'>Send Otp</button>
         </div>
        
         <input type="text"
         placeholder="Enter Otp"
         value={otp} 
         onChange={(e)=>setOtp(e.target.value)}
         required/>

        <input type="password"
         placeholder="Password"
         value={password} 
         onChange={(e)=>setPassword(e.target.value)}
         required/>

         <select value={role} onChange={(e)=>setRole(e.target.value)}>
         <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          
         </select>
    

     <button type="submit">Signup</button>
    
          </form>
          <div className='login-link'>
             <p>Already have an account?<Link to="/login">Login</Link></p>
          </div>
    </div>
  )
}

export default Signup