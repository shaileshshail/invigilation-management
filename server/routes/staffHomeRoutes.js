const express = require('express');
const {
    getEventsCompById,
    } = require('../controllers/staffHomeController');
    
const validateToken = require('../middleware/validateTokenHandler')
const router = express.Router();
//router.use(validateToken);


router.get('/:id',getEventsCompById);


module.exports = router;