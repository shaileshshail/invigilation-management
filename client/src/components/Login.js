import React from 'react'
import { useNavigate,useLocation} from 'react-router-dom'

import { useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState();
  const [password, setpassword] = useState()
  const [message, setmessage] = useState(null)
  const { logIn, auth } = useUserAuth();
  if(auth?.roles=='admin'){
    navigate('/home');
  }
  else if(auth?.roles=='registry'){
    navigate('/registry');
  }
  const onSubmit = async(e)=>{
    e.preventDefault();//prevent page refresh on submit
    try {
      const resMessage = await logIn(e.target[0].value, e.target[1].value);
    } catch (err) {
      setmessage(err.message);
      console.log(err.message);
    }
  }
  useState(()=>{

  },[auth]);
  return (
    <div>
      Login
      {
        <form onSubmit={onSubmit}>
        <input type='text' onChange={(e)=>setemail(e.target.value)}/>
        <input type='text' onChange={(e)=>setpassword(e.target.value)}/>
        <button type='submit'>Submit</button>
      </form>
      }

    
    </div>
  )
}

export default Login