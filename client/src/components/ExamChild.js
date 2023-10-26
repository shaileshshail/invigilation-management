import React from 'react'
import { useNavigate } from 'react-router-dom'
import Bar from './Bar'
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { useExam } from '../context/ExamContext';
import { useClassroom } from '../context/ClassroomContext';
import { useStaff } from '../context/StaffContext';

import Multiselect from 'multiselect-react-dropdown';
const ExamChild = () => {
  const params = useParams()
  const { deleteExam, getById, updateExam } = useExam();
  const { getAll } = useClassroom();
  const { getAllStaff } = useStaff();
  const navigate = useNavigate();

  const [selectedroomList, setselectedroomList] = useState([])
  const [selectedstaffList, setselectedstaffList] = useState([])
  const [count, setcount] = useState({ 'staffCount': 0, 'roomCount': 0 })

  const [exam, setexam] = useState(null)
  const [examdetails, setexamdetails] = useState([])

  const [reload, setreload] = useState(true)

  const [fullroomlist, setfullroomlist] = useState([])
  const [fullstafflist, setfullstafflist] = useState([])

  function formatDate(input) {
    var datePart = input.split('/');
    var month = parseInt(datePart[0]) // get only two digits
    var day = parseInt(datePart[1])
    var year = datePart[2]

    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
  }

  useEffect(() => {
    const load = async () => {
      const val = await getById(params.id);
      let date = new Date(val.data.event[0].date).toLocaleString().split(',')[0];
      date = formatDate(date);
      val.data.event[0].date = date;

      setexam(val.data.event[0]);

      //console.log('selected clasroom',val.data.classrooms)
      setselectedroomList(val.data.classrooms);
      //console.log('selected staffs',val.data.staffs)
      setselectedstaffList(val.data.staffs);

      setcount({ 'staffCount': val.data.staffs.length, 'roomCount': val.data.classrooms.length })

      setexamdetails(val.data.eventdetails);

      //get all classroom
      let data = await getAll();
      setfullroomlist(data.data.classrooms);
      //.log('Full room list', data.data.classrooms)

      //get all staffs
      data = await getAllStaff();
      setfullstafflist(data.data.staffs);
      //console.log('Full staff list', data.data.staffs)
    }
    load();
  }, [reload]);


  const deleteexam = async (e) => {
    e.preventDefault();//prevent page refresh on submit
    const res = window.confirm(exam?.name);
    if(res){
      await deleteExam(params.id);
      navigate('/exam')
    }

  }
  const onsubmit = async (e) => {
    e.preventDefault();//prevent page refresh on submit
    const data = e.target;
    let classroomList = selectedroomList.map((row) => {
      return row.roomId;
    })

    let staffList = selectedstaffList.map((row) => {
      return row.staffId;
    })

    console.log(staffList);
    const formdata = {
      'name': data[0].value,
      'date': data[1].value,
      'session': data[2].value,
      'startTime': data[3].value,
      'endTime': data[4].value,
      'classroomList': classroomList,
      'staffList': staffList
    }
    await updateExam(formdata, params.id);
    setreload(!reload);
    console.log(formdata)
  }



  //Multiselect--dropdown
  const onroomSelect = (selectedList, selectedItem) => {
    setcount({'roomCount':selectedList.length,'staffCount':count.staffCount})
    setselectedroomList(selectedList);
  }
  const onroomRemove = (selectedList, removedItem) => {
    setcount({'roomCount':selectedList.length,'staffCount':count.staffCount})
    setselectedroomList(selectedList);
  }
  const onstaffSelect = (selectedList, selectedItem) => {
    setcount({'staffCount':selectedList.length,'roomCount':count.roomCount})
    setselectedstaffList(selectedList);
  }
  const onstaffRemove = (selectedList, removedItem) => {
    setcount({'staffCount':selectedList.length,'roomCount':count.roomCount})
    setselectedstaffList(selectedList);
  }
  return (
    <>
      <Bar show={1} />
      <div className='container examchild'>
        <h1 className='examchild__title'>ADD EXAM</h1>
        <form className='examchild__upper' onSubmit={onsubmit}>
          <div className='examchild__group'>
            <input className='examchild__name input' type='text' placeholder='name' value={exam?.name} onChange={(e) => setexam({ 'name': e.target.value })} />
            <input className='examchild__date input' type='date' value={exam?.date} onChange={(e) => setexam({ 'date': e.target.value })} />
            <select className='input examchild__session' type='text' placeholder='FN'>
              <option value={'FN'}>FN</option>
              <option value={'AN'}>AN</option>
            </select>
          </div>
          <div className='examchild__group'>
            <input className='examchild__time input' type='time' value={exam?.startTime} onChange={(e) => setexam({ 'startTime': e.target.value })} />
            <input className='examchild__time input' type='time' value={exam?.endTime} onChange={(e) => setexam({ 'endTime': e.target.value })} />
          
            <button className='examchild__submit btn' type='submit'>Update</button>
            <button className='examchild__delete btn' onClick={deleteexam}>Delete</button>
          </div>

          <div className='examchild_group'>
            <div className='multiselectContainer'>
            <Multiselect className='examchild__room' showCheckbox showArrow
              options={fullroomlist} // Options to display in the dropdown
              selectedValues={selectedroomList} // Preselected value to persist in dropdown
              onSelect={onroomSelect} // Function will trigger on select event
              onRemove={onroomRemove} // Function will trigger on remove event
              displayValue="roomId" // Property name to display in the dropdown options
            />
            </div>
            <div className='multiselectContainer'>
            <Multiselect className='examchild__staff' showCheckbox showArrow
              options={fullstafflist} // Options to display in the dropdown
              selectedValues={selectedstaffList} // Preselected value to persist in dropdown
              onSelect={onstaffSelect} // Function will trigger on select event
              onRemove={onstaffRemove} // Function will trigger on remove event
              displayValue="staffId" // Property name to display in the dropdown options
            />
            </div>
                    
          </div>

        </form>
        <div>
          <h2>Rooms Selected  : {count.roomCount} &emsp;&emsp; Staffs Selected : {count.staffCount}</h2>
        </div>
        <div className='examchild__lower'>
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
              {examdetails?.map((row) => {
                return (
                  <tr style={{ backgroundColor: row.attended === 1 ? 'green' : 'white' }} key={row.classroomId + row.staffId}>
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