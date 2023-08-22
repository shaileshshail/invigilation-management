const pool = require('../database/database')


//@desc create classrooms
//@route POST /classrooms
//@access private
const createClassroom = async(req,res)=>{
    console.log('create classroom');
    const room = req.body;
    try{
        await pool.query(`INSERT INTO classrooms VALUES(?,?);`,[room.roomId,room.capacity]);
        res.sendStatus(200);
    }
    catch(err){
        res.status(400).json({"message":err.sqlMessage});
    }
}

//@desc get all classrooms
//@route GET /classrooms
//@access private
const getAllClassroom = async(req,res)=>{
    const [rooms]= await pool.query(`SELECT * FROM classrooms;`);
    console.log(rooms[0]);
    res.status(200).json({"classrooms":rooms});
}


//@desc get all classrooms
//@route PUT /classrooms/:id
//@access private
const updateClassroom= async(req,res)=>{
    const room = req.body;
    const r =await pool.query(`UPDATE classrooms SET capacity=? WHERE roomId=?;`,[room.capacity,room.roomId]);
    console.log(r[0].affectedRows);
    if(r[0].affectedRows){
        res.sendStatus(200);
    }
    else{
        res.sendStatus(400);
    }
}

//@desc delete all classrooms
//@route DELTE /classrooms/
//@access private
const deleteAllClassroom = async(req,res)=>{
    await pool.query(`DELETE FROM classrooms;`);
    res.sendStatus(200);
}

//@desc delete classrooms by id
//@route DELTE /classrooms/:id
//@access private
const deleteClassroomById = async(req,res)=>{
    console.log(req.params.id);
    await pool.query(`DELETE FROM classrooms WHERE roomId=?;`,[req.params.id]);
    res.sendStatus(200);
}

module.exports={
    createClassroom,
    getAllClassroom,
    updateClassroom,
    deleteAllClassroom,
    deleteClassroomById
}




