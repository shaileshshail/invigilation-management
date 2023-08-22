import React from 'react'
import Bar from './Bar'
import { useClassroom } from '../context/ClassroomContext'
import { useState,useEffect } from 'react';

const Classroom = () => {
  const {addRoom,deleteRoom,getAll} = useClassroom();
  const [rooms, setrooms] = useState([])
  const [reload, setreload] = useState(true)
  useEffect(() => {
    const load =async()=>{
      const val=await getAll();
      setrooms(val.data.classrooms)
    }
     load();
  }, [reload]);

  const onsubmit =async (e) => {
    e.preventDefault();//prevent page refresh on submit

    const data = e.target;
    const formdata = {
      'roomId':data[0].value,
      'capacity':data[1].value
    }
    await addRoom(formdata);
    setreload(!reload);
    console.log("classroom from ", formdata)
  }

  const deleteroom =async (id) => {
    await deleteRoom(id);
    setreload(!reload);
  }
  return (
    <>
      <Bar />
      <div className='classroom container'>
        <h1>ADD CLASSROOMS</h1>
        <div className='upper'>
          <form onSubmit={onsubmit}>

            <input type='text' />
            <input type='number' />
            <button type='submit'>Add</button>
          </form>
        </div>
        <div className='lower'>
          <table>
            <thead>
              <tr>
              <td>CLASSROOMS ID</td>
              <td>CAPACITY</td>
              <td>DELETE</td>
              </tr>
            </thead>
            <tbody>
            {rooms.map((room)=>{
              return(
                <tr key={room.roomId}>
                  <td>{room.roomId}</td>
                  <td>{room.capacity}</td>
                  <td><button onClick={()=>{deleteroom(room.roomId)}}>Delete</button></td>
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

export default Classroom