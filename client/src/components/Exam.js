import React from 'react'
import Bar from './Bar'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useExam } from '../context/ExamContext'
export const Exam = () => {
    const navigate = useNavigate();
    const {getAll,deleteExam,addExam} = useExam();
    const [exams, setexams] = useState([])
    const [reload, setreload] = useState(true)
    useEffect(() => {
      const load =async()=>{
        const val=await getAll();
        setexams(val.data.events)
      }
       load();
    }, [reload]);

    const onsubmit =async (e) => {
      e.preventDefault();//prevent page refresh on submit
  
      const data = e.target;
      const formdata = {
        "name":data[0].value,
        "date":data[1].value,
        "session":data[2].value,
        "startTime":data[3].value,
        "endTime":data[4].value,
        "classrooms":[],
        "staffs":[]
      }
      await addExam(formdata);
      setreload(!reload);
      console.log("classroom from ", formdata)
    }
    return (
        <>
      <Bar />
      <div className='container exam'>
        <h1>ADD EXAM</h1>
        <div className='upper'>
          <form onSubmit={onsubmit}>
            <input type='text' placeholder='name'/>
            <input type='date' placeholder='2023-10-28'/>
            <input type='text' placeholder='FN'/>
            <input type='time' defaultValue='09:30:00'/>
            <input type='time' defaultValue='12:30:00'/>
            <button type='submit'>Add</button>
          </form>
        </div>
        <div className='lower'>
          {exams.map((exam)=>{
                return(
                  <div key={exam.eventId} onClick={()=>{navigate(`/exam/${exam.eventId}`)}}  className='box'>
                      <p>{exam.name}</p>
                      <p>{exam.date}</p>
                      <p>{exam.session}</p>
                      <p>{exam.startTime}</p>
                      <p>{exam.endTime}</p>
                  </div>
                )
              })}         
        </div>
      </div>
    </>

    )
}
