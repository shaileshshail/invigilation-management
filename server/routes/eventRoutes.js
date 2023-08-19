const express = require('express');
const {
    createEvent,
    getAllEvent,
    getEventById,
    updateEventById,
    deleteEventById
    } = require('../controllers/eventController');
const router = express.Router();


router.post('/',createEvent);
router.get('/',getAllEvent);
router.get('/:id',getEventById);
router.put('/:id',updateEventById);
router.delete('/:id',deleteEventById);



module.exports = router;