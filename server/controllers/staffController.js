const pool = require('../database/database')


//@desc create Staffs
//@route POST /Staffs
//@access private
const createStaff = async(req,res)=>{
    console.log('create Staff');
}

//@desc get all Staffs
//@route GET /Staffs
//@access private
const getAllStaff = async(req,res)=>{
    console.log('get all Staff');
}

//@desc get all Staffs
//@route GET /Staffs
//@access private
const getStaffById = async(req,res)=>{
    console.log('get Staff by id');
}


//@desc get all Staffs
//@route PUT /Staffs/:id
//@access private
const updateStaffById = async(req,res)=>{
    console.log('update by id Staff');
}



//@desc delete Staffs by id
//@route DELTE /Staffs/:id
//@access private
const deleteStaff= async(req,res)=>{
    console.log('delete by id Staff');
}

module.exports={
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaffById,
    deleteStaff
}




