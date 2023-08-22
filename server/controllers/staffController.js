const pool = require('../database/database')


//@desc create Staffs
//@route POST /Staffs
//@access private
const createStaff = async(req,res)=>{
    console.log('create staff');
    console.log(req.body);
    const {staffId,role,name,email,password,phone,dept} = req.body;
    console.log("role",role);

    try{
        await pool.query(`INSERT INTO staffs VALUES(?,?,?,?,?,?,?);`,
        [staffId,role,name,email,password,phone,dept]);
        res.sendStatus(200);
    }
    catch(err){
        res.status(400).json({"message":err.sqlMessage});
    }
}

//@desc get all Staffs
//@route GET /Staffs
//@access private
const getAllStaff = async(req,res)=>{
    const [staffs]= await pool.query(`SELECT * FROM staffs;`);
    res.status(200).json({"staffs":staffs});
}

//@desc get all Staffs
//@route GET /Staffs
//@access private
const getStaffById = async(req,res)=>{
    const [staffs]= await pool.query(`SELECT * FROM staffs where staffId=?;`,[req.params.id]);
    res.status(200).json({"staff":staffs});
}


//@desc get all Staffs
//@route PUT /Staffs/:id
//@access private
const updateStaffById = async(req,res)=>{
    const {staffId,role,name,email,password,phone,dept} = req.body;
    const r =await pool.query(
        `UPDATE staffs SET role=?,name=?,email=?,password=?,phone=?,dept=?
         WHERE staffId=?;`,
    [role,name,email,password,phone,dept,staffId]);
    console.log(r[0].affectedRows);
    if(r[0].affectedRows){
        res.sendStatus(200);
    }
    else{
        res.sendStatus(400);
    }
}

//@desc delete Staffs by id
//@route DELTE /Staffs/:id
//@access private
const deleteStaffById= async(req,res)=>{
    await pool.query(`DELETE FROM staffs WHERE staffId=?`,[req.params.id]);
    res.sendStatus(200);
}

module.exports={
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaffById,
    deleteStaffById
}




