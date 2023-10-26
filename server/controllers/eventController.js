const pool = require('../database/database')


//@desc create Events
//@route POST /events
//@access private
const createEvent = async(req,res)=>{
    console.log('create event');
    console.log(req.body);
    const {name,date,session,startTime,endTime} = req.body;
    

    try{
        const event=await pool.query(`INSERT INTO events VALUES(NULL,?,?,?,?,?);`,
        [name,date,session,startTime,endTime]);
        res.sendStatus(200);
    }
    catch(err){
        console.log(err)
        res.status(400).json({"message":err.sqlMessage});
    }
}

//@desc get all Events
//@route GET /events
//@access private
const getAllEvent = async(req,res)=>{
    const [events]= await pool.query(`SELECT * FROM events;`);
    console.log(events[0]);
    res.status(200).json({"events":events});

}

//@desc get Events by id
//@route GET /events/:id
//@access private
const getEventById = async(req,res)=>{
    const eventId=req.params.id; 

    console.log('get Event by id...',eventId);

    const [event]= await pool.query(`SELECT * FROM events WHERE eventId=?;`,[eventId]);
    let [classrooms] = await pool.query(`SELECT * FROM eventdetails WHERE eventId=? order by classroomId;`,[eventId]);
    console.log("CLAssrooms .......",classrooms)
    classrooms=classrooms.map((classroom)=>{
        return {roomId:classroom.classroomId};
    })

    let [staffs] = await pool.query(`SELECT staffId FROM eventdetails WHERE eventId=?;`,[eventId]);
    staffs=staffs.map((staff)=>{
        return {staffId:staff.staffId};
    })
    const [eventdetail]= await pool.query(`select * from eventdetails as e
    join staffs as s on e.staffId = s.staffId where eventId=? order by classroomId;`,[eventId]);

    
    return res.status(200).json({"event":event,"classrooms":classrooms,
    "staffs":staffs,"eventdetails":eventdetail});

}
const getEventByDate = async(req,res)=>{
    const date = new Date()
    const today= `${date.getFullYear()}-${date.getMonth()>9?date.getMonth()+1:'0'+(date.getMonth()+1)}-${date.getDate()>9?date.getDate():'0'+date.getDate()}`;
    const session = date.getHours() >12 ? 'AN':'FN';

    console.log('Getting event by date and session for registry') 
    console.log(today,session) 
    try{
        const [response] = await pool.query(`SELECT * FROM events WHERE date=? AND session=?`,[today,session]);
        return res.status(200).json({"event":response,'sd':'asdad'});

    }
    catch(err){
        console.log("get event by date - registry",err)
    }

    return res.status(400).json({"event":"dd"});

}


//@desc update Event by id
//@route PUT /events/:id
//@access private
const updateEventById = async(req,res)=>{
    const eventId=req.params.id; 
    console.log('updating event...', eventId);
    console.log(req.body);
    var {name,date,session,startTime,endTime,classroomList,staffList} = req.body;

    const shuffleArray=(array)=>{
        for (var i = array.length - 1; i > 0; i--) { 
            var j = Math.floor(Math.random() * (i + 1));// Generate random number 
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    staffList=shuffleArray(staffList);

    try{
        const event=await pool.query(`UPDATE events SET name=?,date=?,session=?
        ,startTime=?,endTime=? WHERE eventId=?`,
        [name,date,session,startTime,endTime,eventId]);


        await pool.query(`DELETE FROM eventDetails WHERE eventId=?`,[eventId]);
        for(let i=0;i<staffList.length;i++){
            console.log(date,session);
            await pool.query(`INSERT INTO eventDetails VALUES(?,?,?,?,?,0)`,
            [eventId,staffList[i],classroomList[i],date,session])
        }
        
        res.sendStatus(200);
    }
    catch(err){
        console.log(err)
        res.status(400).json({"message":err.sqlMessage});
    }
}



//@desc delete Event by id
//@route DELETE /events/:id
//@access private
const deleteEventById= async(req,res)=>{
    const eventId=req.params.id; 
    await pool.query(`DELETE FROM eventdetails WHERE eventId=?`,[eventId]);

    await pool.query(`DELETE FROM events WHERE eventId=?`,[eventId]);

    res.sendStatus(200);
    console.log('delete by id Event...',eventId);
}

module.exports={
    createEvent,
    getAllEvent,
    getEventById,
    updateEventById,
    deleteEventById,
    getEventByDate
}




