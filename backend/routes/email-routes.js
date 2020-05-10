const express = require('express');

const emailController = require('../controllers/email-controllers');
const router = express.Router();

//Send email to Guest
router.post('/send', emailController.sendEmail);

//Send email to reset password
router.post('/reset', emailController.resetPassword);

module.exports = router;