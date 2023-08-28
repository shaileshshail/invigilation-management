import React from 'react'
import { useExam } from '../context/ExamContext'
import { useState, useEffect } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { useNavigate } from 'react-router-dom'

const Registry = () => {
    const {logOut}=useUserAuth();
    const navigate = useNavigate();
    const { registerAttendence, getByDate } = useExam();
    const eventId = 14;
    const [reload, setreload] = useState(true)
    useEffect(() => {
        const load = async () => {
            var d = new Date(); 
            const date = d.toJSON().slice(0, 10);
            const session = d.getHours()>12 ? 'AN':'FN';
            console.log(date,session)
            const val = await getByDate('2023-08-21T18:30:00.000Z','FN');
            console.log(val);            
        }
        load();
    }, [reload]);

    const onsubmit = async (e) => {
        await registerAttendence(eventId, e.target.data[0].value)
    }
    const logout=async()=>{
        await logOut();
        navigate('/');
    }
    return (
        <div>
            <h1>Need to get event based on date and session -- pending</h1>
            <form onSubmit={onsubmit}>
                <input type='text' placeholder='Staff Id' />
                <button type='submit'>Submit</button>
            </form>
            <button onClick={logout}>Log OUt</button>


        </div>
    )
}

export default Registry