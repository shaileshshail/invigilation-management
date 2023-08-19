const express = require('express');
const {
    createClassroom,
    getAllClassroom,
    updateClassroomById,
    deleteAllClassroom,
    deleteClassroomById
} = require('../controllers/classroomController');

const router = express.Router();

router.post('/',createClassroom);
router.get('/',getAllClassroom);
router.put('/',updateClassroomById);
router.delete('/',deleteAllClassroom);
router.delete('/:id',deleteClassroomById);

module.exports = router;