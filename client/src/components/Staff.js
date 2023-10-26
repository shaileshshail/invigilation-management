import React, { useEffect, useState } from 'react'
import Bar from './Bar'
import { useStaff } from '../context/StaffContext'

const Staff = () => {
  const [staffs, setstaffs] = useState()
  const [reload, setreload] = useState(true)
  const { addStaff, deleteStaff, getAllStaff } = useStaff();

  useEffect(() => {
    const load = async () => {
      const val = await getAllStaff();
      setstaffs(val.data.staffs)
    }
    load();
  }, [reload]);

  const onsubmit = async (e) => {
    e.preventDefault();//prevent page refresh on submit

    const data = e.target;
    const formdata = {
      'staffId': data[0].value,
      'role': data[1].value,
      'dept': data[2].value,
      'email': data[3].value,
      'name': data[4].value,
      'phone': data[5].value,
      'password': data[6].value
    }
    await addStaff(formdata);
    setreload(!reload);
    console.log("classroom from ", formdata)
  }
  const deletestaff = async (id) => {
    const res = window.confirm(id);
    if(res){
      await deleteStaff(id);
      setreload(!reload);
    }
  }
  return (
    <>
      <Bar show={1} />
      <div className='staff container'>
        <h1 className='staff__title'>ADD STAFF</h1>
        <form className='staff__upper' onSubmit={onsubmit}>
          <div className='form-grp'>
            <input className='id input' type='text' placeholder='id' />
            <select className='role input'>
              <option value={'admin'}>Admin</option>
              <option value={'staff'}>Staff</option>
              <option value={'registry'}>Office Staff</option>
            </select>
            <input className='dept input' type='text' placeholder='Department' />
            <input className='email input' type='text' placeholder='Email' />
          </div>

          <div className='form-grp'>
            <input className='input' type='text' placeholder='Name' />
            <input className='input' type='number' placeholder='+91 948168731512' />
            <input className='input' type='text' placeholder='password' />
          </div>
          <button className='staff__submit btn' type='submit'>Add</button>
        </form>
        <div className='staff__lower'>
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
              {staffs?.map((staff) => {
                return (
                  <tr key={staff.staffId}>
                    <td>{staff.staffId}</td>
                    <td>{staff.name}</td>
                    <td>{staff.role}</td>
                    <td>{staff.email}</td>
                    <td>{staff.dept}</td>
                    <td>{staff.phone}</td>
                    <td>{staff.password}</td>
                    <td><button disabled={staff.role == 'admin'} onClick={() => { deletestaff(staff.staffId) }}>Delete</button></td>
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