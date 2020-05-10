const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const taskController = require('../controllers/tasks-controller');

router.get('/', taskController.getAllTasks);
router.get('/event/:id', taskController.getTasksByEventId);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id', taskController.updateStatus);
router.post('/' , 
    [
        check('task', 'Please enter a valid task').not().isEmpty().isLength({min: 3}).trim(),
        check('endDate', 'Please enter a Date').isISO8601().toDate()
        .custom((value, {req}) => {
            if(value <= Date.now()){
                throw new Error('Invalide date');
            }
            return true;
        })
    ],
    taskController.createTask
);



module.exports = router;