const express = require('express');
const { check } = require('express-validator');

const guestController = require('../controllers/guests-controller');
const router = express.Router();

//Get guest by ID
router.get('/:id', guestController.getGuestById);

//Get all guests in Event
router.get('/event/:id', guestController.getGuestsByEventId);

//Add/Post new Guest 
router.post('/', 
    [
        check('firstName', 'Please enter a valid first name').not().isEmpty().isLength({min: 2}).trim(),
        check('lastName', 'Please enter a valid last name').not().isEmpty().isLength({min: 2}).trim(),
        check('age', 'Please enter a valid age number').not().isEmpty().isNumeric().trim().isInt({gt:10, lt: 100}),
        check('email', 'Please enter a valid e-mail address').not().isEmpty().isEmail().trim()
    ],
    guestController.addNewGuest
);

//Delete guest by ID
router.delete('/:id', guestController.deleteGuest);

//Update Guest 
router.patch('/:id',
    [
        check('firstName', 'Please enter a valid first name').not().isEmpty().isLength({min: 2}).trim(),
        check('lastName', 'Please enter a valid last name').not().isEmpty().isLength({min: 2}).trim(),
        check('age', 'Please enter a valid age number').not().isEmpty().isNumeric().trim().isInt({gt:10, lt: 100}),
        check('email', 'Please enter a valid e-mail address').not().isEmpty().isEmail().trim()
    ],
    guestController.updateGuest
);

//Update only Guest status
router.patch('/status/:id', guestController.updateStatus);


module.exports = router;