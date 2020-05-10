const express = require('express');
const { check } = require('express-validator');

const eventController = require('../controllers/events-controller');
const router = express.Router();

router.get('/:id', eventController.getEventById);
router.get('/user/:id', eventController.getEventsByUserID);
router.delete('/:id', eventController.deleteEvent);
router.patch('/:id',
    [
        check('title', 'Please enter a valid title').not().isEmpty().isLength({min: 3}).trim(),
        check('location', 'Please enter a valid location').not().isEmpty().isLength({min: 3}).trim(),
        check('expGuests', 'Please enter a valid Guests number').not().isEmpty().isNumeric().trim(),
        check('eventDate', 'Please enter a Date').isISO8601().toDate() 
        .custom((value, {req}) => {
            if(value <= Date.now()){
                throw new Error('Invalide date');
            }
            return true;
        })      
    ], 
    eventController.updateEvent
);
router.patch('/status/:id', eventController.statusUpdate)
router.post('/', 
    [
        check('title', 'Please enter a valid title').not().isEmpty().isLength({min: 3}).trim(),
        check('location', 'Please enter a valid location').not().isEmpty().isLength({min: 3}).trim(),
        check('expGuests', 'Please enter a valid Guests number').not().isEmpty().isNumeric().trim(),
        check('eventDate', 'Please enter a Date').isISO8601().toDate()
        .custom((value, {req}) => {
            if(value <= Date.now()){
                throw new Error('Invalide date');
            }
            return true;
        })
    ], 
    eventController.createEvent
);

module.exports = router;