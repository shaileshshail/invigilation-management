import React from 'react'
import { useUserAuth } from '../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';

import {BsBook,BsPeopleFill,BsDoorOpenFill} from 'react-icons/bs';

const Bar = (props) => {
    const { auth,logOut } = useUserAuth();
    const navigate=useNavigate();
    const logout=async()=>{
        await logOut();
        navigate('/');
    }
    return (
        <div className='bar'>
            <nav className='navbar'>
                <button className='navbar__logo' onClick={() => navigate('/exam')}>LOGO</button>
                <div className='navbar__userid'>User ID : {auth?.user.email}    ||   Role : {auth?.roles}</div>
                <div className='navbar__userid'>   StaffId : {auth?.user.staffid}</div>
                <button onClick={logout} className='navbar__logout'>Logout</button>
            </nav>
            {props.show ? <div className='sidebar'>
                <p className='sidebar__title'>Exam Invigilation Portal</p>
                <ul>
                    <li key={"0"} onClick={() => navigate('/exam')} className='sidebar-row'>
                        <div className='icon'><BsBook /></div>
                        <label >Manage Exam</label>
                    </li>
                    <li key={"1"} onClick={() => navigate('/staff')} className='sidebar-row'>
                        <div className='icon'><BsPeopleFill /></div>
                        <label >Manage Staff</label>
                    </li>
                    <li key={"2"} onClick={() => navigate('/classroom')} className='sidebar-row'>
                        <div className='icon'><BsDoorOpenFill /></div>
                        <label >Manage Classroom</label>
                    </li>
                </ul>
            </div>:<></>}
            
        </div>
    )
}

export default Bar