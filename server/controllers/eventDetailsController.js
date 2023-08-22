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
    const r =await pool.query(`UPDATE eventdetails SET attended=1 WHERE eventId=? AND staffId=?;`,
    [req.params.eventId,req.params.staffId]);

    console.log(r[0].affectedRows);
    if(r[0].affectedRows){
        res.sendStatus(200);
    }
    else{
        res.sendStatus(400);
    }
}

module.exports = {getEventDetailsById,updateEventDetailsById};