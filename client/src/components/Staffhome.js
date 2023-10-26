import React from 'react'
import Bar from './Bar'
import { useUserAuth } from '../context/UserAuthContext';
import { useStaffHome } from '../context/StaffHomeContext';
import { useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';

export const Staffhome = () => {
  const { auth, logOut } = useUserAuth();
  const { getAllCompEventById } = useStaffHome();
  const [compEvent, setcompEvent] = useState([])
  const navigate = useNavigate();
  const logout = async () => {
    await logOut();
    navigate('/');
  }

  useEffect(() => {
    const load = async () => {
      const val = await getAllCompEventById(auth.user.staffid);
      setcompEvent(val.data.staffs);
      console.log(val);
    }
    load();
  }, []);
  return (
    <div className='staffhome'>
      <nav className='staffhome__navbar'>
        <button className='navbar__logo' onClick={() => navigate('/exam')}>LOGO</button>
        <div className='navbar__userid'>User ID : {auth?.user.email}    ||   Role : {auth?.roles}</div>
        <div className='navbar__userid'>   StaffId : {auth?.user.staffid}</div>
        <button onClick={logout} className='navbar__logout'>Logout</button>
      </nav>
      <div className='staffhome__dutylist'>
      {compEvent?.map((duty) => {
        return (

          <div className='staffhome__duty' style={{ backgroundColor: duty.attended ? "#41c37e" : "#ffa69b" }}>
            <p>{duty.date}</p>
            <p>{duty.session}</p>
            <p>{duty.attended == 1 ? duty.classroomId : "Attendance not registered"}</p>
 
          </div>
        )
      })}
    </div>            

    </div>
  )
}
