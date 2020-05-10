const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transport = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_user: process.env.SENDGRID_API_KEY
    }
}))

const sendEmail = async ( req, res ) => {

    const { nameFrom, message, email } = req.body;

    try{
        transport.sendMail({
            to: email,
            from: 'd_hristoskov@hotmail.com',
            subject: nameFrom,
            html: message
        })
        res.send('Email sent!')
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error')
    }
}

const resetPassword = async ( req, res ) => {
    
    let token
    crypto.randomBytes(32, (err, buffer) => {
        if(err){
            console.log(err)
        }
    token = buffer.toString('hex');       
    });

    let user
    try{
        user = await User.findOne({email: req.body.email});
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error')
    }

    if(!user){
        return res.json({ msg: 'No account with that e-mail'});
    }

    try{
        transport.sendMail({
            to: req.body.email,
            from: 'd_hristoskov@hotmail.com',
            subject: 'Password reset',
            html: `<h3>This is your Password reset link</h3>'
            <P>Click the <a href="http://localhost:3000/email/reset/${token}">link</a> to reset your password and create a new one</p>`
        })
        res.send('Email sent!')
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error')
    }
};

exports.sendEmail = sendEmail;
exports.resetPassword = resetPassword;