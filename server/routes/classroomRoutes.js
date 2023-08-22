const express = require('express');
const {
    createClassroom,
    getAllClassroom,
    updateClassroom,
    deleteAllClassroom,
    deleteClassroomById
} = require('../controllers/classroomController');

const validateToken = require('../middleware/validateTokenHandler')
const router = express.Router();
//router.use(validateToken);

router.post('/',createClassroom);
router.get('/',getAllClassroom);
router.put('/',updateClassroom);
router.delete('/',deleteAllClassroom);
router.delete('/:id',deleteClassroomById);

module.exports = router;