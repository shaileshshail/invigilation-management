const express = require('express');
const {
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaffById,
    deleteStaffById,
    } = require('../controllers/staffController');
const validateToken = require('../middleware/validateTokenHandler')
const router = express.Router();
//router.use(validateToken);


router.post('/',createStaff);
router.get('/',getAllStaff);
router.get('/:id',getStaffById);
router.put('/',updateStaffById);
router.delete('/:id',deleteStaffById);


module.exports = router;