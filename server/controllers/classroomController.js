const pool = require('../database/database')


//@desc create classrooms
//@route POST /classrooms
//@access private
const createClassroom = async(req,res)=>{
    console.log('create classroom');
}

//@desc get all classrooms
//@route GET /classrooms
//@access private
const getAllClassroom = async(req,res)=>{
    console.log('get all classroom');
}


//@desc get all classrooms
//@route PUT /classrooms/:id
//@access private
const updateClassroomById = async(req,res)=>{
    console.log('update by id classroom');
}

//@desc delete all classrooms
//@route DELTE /classrooms/
//@access private
const deleteAllClassroom = async(req,res)=>{
    console.log('delete all classroom');
}

//@desc delete classrooms by id
//@route DELTE /classrooms/:id
//@access private
const deleteClassroomById = async(req,res)=>{
    console.log('delete by id classroom');
}

module.exports={
    createClassroom,
    getAllClassroom,
    updateClassroomById,
    deleteAllClassroom,
    deleteClassroomById
}




