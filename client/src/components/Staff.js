import React, { useEffect, useState } from 'react'
import Bar from './Bar'
import { useStaff } from '../context/StaffContext'

const Staff = () => {
  const [staffs, setstaffs] = useState()
  const [reload, setreload] = useState(true)
  const {addStaff,deleteStaff,getAll} =useStaff();

  useEffect(()=>{
    const load =async()=>{
      const val=await getAll();
      setstaffs(val.data.staffs)
    }
     load();
  },[reload]);

  const onsubmit = async(e) => {
    e.preventDefault();//prevent page refresh on submit

    const data = e.target;
    const formdata = {
      'staffId':data[0].value,
      'role':data[1].value,
      'name':data[2].value,
      'dept':data[3].value,
      'phone':data[4].value,
      'email':data[5].value,
      'password':data[6].value
    }
    await addStaff(formdata);
    setreload(!reload);
    console.log("classroom from ", formdata)
  }
  const deletestaff =async (id) => {
    await deleteStaff(id);
    setreload(!reload);
  }
  return (
    <>
      <Bar />
      <div className='staff container'>
        <h1>ADD STAFF</h1>
        <div className='upper'>
          <form onSubmit={onsubmit}>
            <div>
            <input type='text' placeholder='id'/>
            <input type='text' placeholder='role'/>
            </div>
            <input type='text' placeholder='name'/>
            <input type='text' placeholder='department'/>
            <input type='number' placeholder='123456789'/>
            <input type='text' placeholder='email'/>
            <input type='text' placeholder='password'/>
            <button type='submit'>Add</button>
          </form>
        </div>
        <div className='lower'>
          <table>
            <thead>
              <tr>
              <td>STAFF ID</td>
              <td>NAME</td>
              <td>EMAIL</td>
              <td>ROLE</td>
              <td>DEPARTMENT</td>
              <td>PASSWORD</td>
              <td>DELETE</td>
              </tr>
            </thead>
            <tbody>
            {staffs?.map((staff)=>{
              return(
                <tr key={staff.staffId}>
                  <td>{staff.staffId}</td>
                  <td>{staff.name}</td>
                  <td>{staff.role}</td>
                  <td>{staff.email}</td>
                  <td>{staff.dept}</td>
                  <td>{staff.phone}</td>
                  <td>{staff.password}</td>
                  <td><button disabled={staff.role=='admin'} onClick={()=>{deletestaff(staff.staffId)}}>Delete</button></td>
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

export default Staff