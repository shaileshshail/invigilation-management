import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react';
import { useUserAuth } from '../context/UserAuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState();
  const [password, setpassword] = useState()
  const [message, setmessage] = useState(null)
  const { logIn, auth,loading } = useUserAuth();
 
  if (auth?.roles === 'admin') {
    navigate('/exam');
  }
  else if (auth?.roles === 'registry') {
    navigate('/registry');
  }
  else if (auth?.roles === 'staff') {
    navigate('/staffhome');
  }

 
  const onSubmit = async (e) => {
    e.preventDefault();//prevent page refresh on submit
    try {
      const resMessage = await logIn(e.target[0].value, e.target[1].value);
    } catch (err) {
      setmessage(err.message);
      console.log(err.message);
    }
  }
  useEffect(() => {
    if (auth?.roles === 'admin') {
      navigate('/exam');
    }
    else if (auth?.roles === 'registry') {
      navigate('/registry');
    }
    else if (auth?.roles === 'staff') {
      navigate('/staffhome');
    }
  }, [auth]);

  return (
    <div className='login'>
      <form onSubmit={onSubmit} className='login__form'>
        <h1>Admin Login</h1>
        <input type='text' placeholder='Enter Username' onChange={(e) => setemail(e.target.value)} />
        <input type='password' placeholder='Enter Password' onChange={(e) => setpassword(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login