const express = require('express');
const {
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaffById,
    deleteStaff,
    } = require('../controllers/staffController');

const router = express.Router();


router.post('/',createStaff);
router.get('/',getAllStaff);
router.get('/:id',getStaffById);
router.put('/',updateStaffById);
router.delete('/',deleteStaff);


module.exports = router;