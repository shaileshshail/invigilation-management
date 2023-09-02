import React from 'react'
import { useExam } from '../context/ExamContext'
import { useState, useEffect } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { useNavigate } from 'react-router-dom'

const Registry = () => {
    const {logOut}=useUserAuth();
    const navigate = useNavigate();
    const { registerAttendence, getByDate } = useExam();
    const [event, setevent] = useState(null)
    const [reload, setreload] = useState(true)
    const [message, setmessage] = useState(null)
    const date= new Date();

    useEffect(() => {
        const load = async () => {
            const val = await getByDate();
            setevent(val.data.event);
            console.log(val);        
            console.log(parseInt(event?.startTime?.split(':')[0]-date.getHours()))    
        }
        load();
    }, [reload]);

    const onsubmit = async (e) => {
        e.preventDefault();
        const response = await registerAttendence(event?.eventId, e.target[0].value)
        setmessage(response);
        
    }
    const logout=async()=>{
        await logOut();
        navigate('/');
    }
    return (
        <div>
            <div>
                {JSON.stringify(event)}
            </div>
            <form onSubmit={onsubmit}>
                <input type='text' placeholder='Staff Id' />
                <button type='submit'>Submit</button>
            </form>
            <div hidden={message==null}>attendence registered successfully</div>
            <br></br>
            <br></br>
            <br></br>
            <h2>{message?.classroomId}</h2>
            <button onClick={logout}>Log OUt</button>


        </div>
    )
}

export default Registry