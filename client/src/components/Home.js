import React from 'react'
import {Link} from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
import Bar from './Bar';

export const Home = () => {
  const { auth } = useUserAuth();
  const navigate=useNavigate();
  return (
    <div className='home'>
      <Bar />
      <div className='container'>
        rest
      </div>
    </div>
  )
}
