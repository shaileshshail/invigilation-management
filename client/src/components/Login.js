import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState();
  const [password, setpassword] = useState()
  const [message, setmessage] = useState(null)
  const { logIn, user } = useUserAuth();

  const onSubmit = async(e)=>{
    
    e.preventDefault();//prevent page refresh on submit
    try {
      const resMessage = await logIn(e.target[0].value, e.target[1].value);
      console.log('login succ')
      navigate("/home");
    } catch (err) {
      setmessage(err.message);
      console.log(err.message);
    }
  }
  return (
    <div>
      Login
      {user ? (navigate('/home')):(
        <form onSubmit={onSubmit}>
        <input type='text' onChange={(e)=>setemail(e.target.value)}/>
        <input type='text' onChange={(e)=>setpassword(e.target.value)}/>
        <button type='submit'>Submit</button>
      </form>
      )}

    
    </div>
  )
}

export default Login