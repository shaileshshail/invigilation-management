import React from 'react'
import { useNavigate } from 'react-router-dom'
import Bar from './Bar'
import { useParams } from 'react-router';
import { useState,useEffect } from 'react'; 
import { useExam } from '../context/ExamContext';

const ExamChild = () => {
    const params= useParams()
    const {deleteExam,getById,updateExam} =useExam();
    const navigate = useNavigate();
    const [roomList, setroomList] = useState(['EW102','WW201'])
    const [staffList, setstaffList] = useState([['IT9999','ISE333']])
    const [exam, setexam] = useState(null)
    const [examdetails, setexamdetails] = useState([])
    const [reload, setreload] = useState(true)

    useEffect(() => {
      const load =async()=>{
        const val=await getById(params.id);
        setexam(val.data.event[0]);
        setroomList(val.data.classrooms);
        setstaffList(val.data.staffs);
        setexamdetails(val.data.eventdetails);
      }
       load();
    }, [reload]);


    const deleteexam =async(e)=>{
        e.preventDefault();//prevent page refresh on submit
        await deleteExam(params.id);
        navigate('/exam')
    }
    const onsubmit = async(e)=>{
        e.preventDefault();//prevent page refresh on submit
        const data=e.target;
        const formdata={
            'name':data[0].value,
            'date':data[1].value,
            'session':data[2].value,
            'startTime':data[3].value,
            'endTime':data[4].value,
            'classroomList':roomList,
            'staffList':staffList
        }
        await updateExam(formdata,params.id);
        setreload(!reload);
        console.log(formdata)
    }
    const SETroom =(e)=>{
        const val =e.target.value.split(',');
        setroomList(val)
    }
    const SETstaff =(e)=>{
        const val =e.target.value.split(',');
        setstaffList(val)
    }
  return (
    <>
      <Bar />
      <div className='container exam'>
        <h1>ADD EXAM</h1>
        <div className='upper'>
          <form onSubmit={onsubmit}>
            <input type='text' placeholder='name' value={exam?.name}/>
            <input type='date'  value={exam?.date.split('T')[0]}/>
            <input type='text' placeholder='FN' value={exam?.session}/>
            <input type='time'  value={exam?.startTime}/>
            <input type='time'  value={exam?.endTime}/>
            <textarea value={roomList} placeholder='Classrooms' onChange={(e)=>SETroom(e)}/>
            <textarea value={staffList} placeholder='Staffs' onChange={(e)=>SETstaff(e)}/>
            <button type='submit'>Add</button>
            <button onClick={deleteexam}>Delete</button>
          </form>
        </div>
        <div className='lower'>
          <table>
            <thead>
                <tr>
                <th>ATTENDED</th>
                <th>CLASSROOMS</th>
                <th>STAFF ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                </tr>
            </thead>
            <tbody>
            {examdetails?.map((row)=>{
              return(
                <tr key={row.classroomId + row.staffId}>
                  <td>{row.attended}</td>
                  <td>{row.classroomId}</td>
                  <td>{row.staffId}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.phone}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ExamChild