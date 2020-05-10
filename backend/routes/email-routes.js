const express = require('express');

const emailController = require('../controllers/email-controllers');
const router = express.Router();

router.post('/send', emailController.sendEmail);
router.post('/reset', emailController.resetPassword);

module.exports = router;