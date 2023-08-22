const express = require('express');
const {
    getEventDetailsById,
    updateEventDetailsById
    } = require('../controllers/eventDetailsController');

const validateToken = require('../middleware/validateTokenHandler')

const router = express.Router();
//router.use(validateToken);


router.get('/:id',getEventDetailsById);
router.put('/:eventId/:staffId',updateEventDetailsById);



module.exports = router;