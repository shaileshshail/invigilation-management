const pool = require('../database/database')


//@desc get all Staffs
//@route GET /Staffs
//@access private
const getEventsCompById = async(req,res)=>{
    req.params.id
    const [staffs]= await pool.query(`SELECT * FROM eventdetails where staffid=?;`,[req.params.id]);
    res.status(200).json({"staffs":staffs});
}


module.exports={
    getEventsCompById,
}




