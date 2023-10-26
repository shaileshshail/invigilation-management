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
    let date =new Date();
    let today =new Date();

    const offset = date.getTimezoneOffset()
    today = new Date(today.getTime() - (offset*60*1000))
    today = today.toISOString().split('T')[0]
    console.log(today)

    useEffect(() => {
      const load =async()=>{
        const val=await getAll();
        setexams(val?.data?.events)
      }
       load();
    }, [reload]);

    const onsubmit =async (e) => {
      e.preventDefault();//prevent page refresh on submit
      const data = e.target;
      console.log(data)
      let date= new Date(data[1].value)
      date=date.toISOString().slice(0,23)
      //console.log(date.toISOString().slice(0,23))
      const formdata = {
        "name":data[0].value,
        "date":date,
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
      <Bar show={1} />
      <div className='container exam'>
        <h1 className='exam_title'>CREATE EXAM SCHEDULE</h1>
          <form className='exam__upper' onSubmit={onsubmit}>
            <div className='exam__group'>
            <input className='input exam__name' type='text' placeholder='Enter examination name'/>
            <input className='input exam__date' type='date' min={today} placeholder='2023-10-28'/>
            <select className='input exam__session' type='text' placeholder='FN'>
              <option value={'FN'}>FN</option>
              <option value={'AN'}>AN</option>
            </select>
            </div>

            <input className='input exam__time' type='time' defaultValue='09:30:00'/>
            <input className='input exam__time' type='time' defaultValue='12:30:00'/>
            <button className='input exam__submit btn' type='submit'>Add</button>
          </form>
        <div className='exam__lower'>
          {exams?.map((exam)=>{
                return(
                  <div className='box' key={exam.eventId} onClick={()=>{navigate(`/exam/${exam.eventId}`)}}>
                      <p>{exam.name}</p>
                      <p>{new Date(exam.date).toLocaleDateString()}</p>
                      <p>{exam.session}</p>
                      <p>{exam.startTime}</p>
                      <p>{exam.endTime}</p>
                      {date.toLocaleDateString()===new Date(exam.date).toLocaleDateString()?'Today':''}
                  </div>
                )
              })}         
        </div>
      </div>
    </>

    )
}
