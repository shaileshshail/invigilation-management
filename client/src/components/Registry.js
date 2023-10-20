import React from 'react'
import { useExam } from '../context/ExamContext'
import { useState, useEffect } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { useNavigate } from 'react-router-dom'

const Registry = () => {
    const { logOut, auth } = useUserAuth();
    const navigate = useNavigate();
    const { registerAttendence, getByDate } = useExam();
    const [event, setevent] = useState(null)
    const [reload, setreload] = useState(true)
    const [message, setmessage] = useState(null)

    const date = new Date();

    useEffect(() => {
        const load = async () => {
            const val = await getByDate();
            setevent(val.data?.event[0]);
            console.log(val);
        }
        load();
    }, [reload]);

    const onsubmit = async (e) => {
        e.preventDefault();
        console.log(event?.eventId, e.target[0].value)
        const response = await registerAttendence(event?.eventId, e.target[0].value)
        setmessage(response);

    }
    const logout = async () => {
        await logOut();
        navigate('/');
    }
    return (
        <div className='registry'>
            <nav className='registry__navbar'>
                <button className='navbar__logo' onClick={() => navigate('/exam')}>LOGO</button>
                <div className='navbar__userid'>User ID : {auth?.user.email}    ||   Role : {auth?.roles}</div>
                <button onClick={logout} className='navbar__logout'>Logout</button>
            </nav>
            <div className='registry__event'>
                <h1>Active Examinations :</h1>
                <p>{event?.name}</p>
                <p>{event?.date}</p>
                <p>{event?.session}</p>
                <p>{event?.startTime}</p>
                <p>{event?.endTime}</p>
            </div>
            <div>
                <form onSubmit={onsubmit}>
                    <input type='text' placeholder='Staff Id' />
                    <button type='submit'>Submit</button>
                </form>
                <div hidden={message == null}>attendence registered successfully</div>

                <h2>{message?.classroomId}</h2>
            </div>

        </div>
    )
}

export default Registry