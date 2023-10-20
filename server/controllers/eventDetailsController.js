const pool =require('../database/database')


//@desc get all eventDetails by id
//@route GET /eventdetails/:id
//@access private
const getEventDetailsById = async(req,res)=>{
    const [event]= await pool.query(`SELECT * FROM eventdetails WHERE eventId=?;`,
    [parseInt(req.params.id)]);
    res.status(200).json({"data":event})
}

//@desc update event details by id
//@route PUT /eventdetails/:id
//@access private
const updateEventDetailsById= async(req,res)=>{
    console.log('registering attendence for staff',req.params.staffId,req.params.eventId);
    const r =await pool.query(`UPDATE eventdetails SET attended=1 WHERE eventId=? AND staffId=?;`,[req.params.eventId,req.params.staffId]);

    const [classroom] =await pool.query(`SELECT classroomId from eventdetails WHERE eventId=? AND staffId=?;`,
    [req.params.eventId,req.params.staffId]);
    
    console.log(r[0]);
    if(r[0].affectedRows){
        return res.status(200).json({'classroomId':classroom[0].classroomId,'affectedRows':r[0].affectedRows});
    }
    else{
        res.sendStatus(400);
    }
}

module.exports = {getEventDetailsById,updateEventDetailsById};