const pool = require('../database/database')


//@desc create Events
//@route POST /events
//@access private
const createEvent = async(req,res)=>{
    console.log('create Event');
}

//@desc get all Events
//@route GET /events
//@access private
const getAllEvent = async(req,res)=>{
    console.log('get all Event');
}

//@desc get Events by id
//@route GET /events/:id
//@access private
const getEventById = async(req,res)=>{
    console.log('get Event by id');
}


//@desc update Event by id
//@route PUT /events/:id
//@access private
const updateEventById = async(req,res)=>{
    console.log('update by id Event');
}



//@desc delete Event by id
//@route DELETE /events/:id
//@access private
const deleteEventById= async(req,res)=>{
    console.log('delete by id Event');
}

module.exports={
    createEvent,
    getAllEvent,
    getEventById,
    updateEventById,
    deleteEventById
}




