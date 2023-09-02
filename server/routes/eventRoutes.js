const express = require('express');
const {
    createEvent,
    getAllEvent,
    getEventById,
    updateEventById,
    deleteEventById,
    getEventByDate
    } = require('../controllers/eventController');
const validateToken = require('../middleware/validateTokenHandler')
const router = express.Router();
//router.use(validateToken);


router.post('/',createEvent);
router.get('/',getAllEvent);
router.get('/:id',getEventById);
router.get('/registry/bydate',getEventByDate);
router.put('/:id',updateEventById);
router.delete('/:id',deleteEventById);



module.exports = router;