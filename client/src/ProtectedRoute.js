import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserAuth } from './context/UserAuthContext';

export const ProtectedRoute = ({children}) => {
  let {user}=useUserAuth();
  console.log("protected routes",user)
  if(!true){
    return <Navigate to="/"/>
  }
  return (
      children
  )
}
