import React from 'react'
import { useUserAuth } from '../context/UserAuthContext';
import { useNavigate } from 'react-router-dom';
const Bar = () => {
    const { user } = useUserAuth();
    const navigate=useNavigate();

    return (
        <div>
            <nav>
                <button onClick={() => navigate('/home')}>LOGO</button>
                <div>{JSON.stringify(user?.user)}</div>
                <button>Logout</button>
            </nav>
            <div className='sidebar'>
                <ul>
                    <li key={"0"} onClick={() => navigate('/exam')} className='sidebar-row'>
                        <div className='icon'>a</div>
                        <label >Manage Exam</label>
                    </li>
                    <li key={"1"} onClick={() => navigate('/staff')} className='sidebar-row'>
                        <div className='icon'>b</div>
                        <label >Add Staff</label>
                    </li>
                    <li key={"2"} onClick={() => navigate('/classroom')} className='sidebar-row'>
                        <div className='icon'>c</div>
                        <label >Add Classroom</label>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Bar