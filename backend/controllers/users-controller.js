const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../models/user');

const registerUser = async ( req, res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ msg: 'Invalid input, please check your data' })
    }

    const { name, email, password } = req.body

    let user;
    try {
        user = await User.findOne({ email });
    }catch(err){
        console.errors(err.message)
        res.status(500).send('Server Error')
    }

    if(user){
        return res.status(422).json({ msg: 'User already exists, please login instead.' })
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    }catch(err){
        console.errors(err.message);
        res.status(500).send('Server Error');
    }

    user = new User({
        name,
        email,
        password: hashedPassword,
        events: []
    });

    try{
        await user.save();
    }catch{
        console.errors(err.message);
        res.status(500).send('Server Error');
    }
    
    let token;
    try{
        token = jwt.sign(
            {userId: user.id, name: user.name},
            process.env.JWT_SECRET, 
            {expiresIn: '1h'});
    }catch(err){
        console.errors(err.message);
        res.status(500).send('Server Error');
    };

    res.status(201).json({userId: user.id, name: user.name, token: token});
};


const loginUser = async ( req, res ) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ msg: 'Invalid input, please check your data' });
    }

    const { email, password } = req.body;

    let user;
    try {
        user = await User.findOne({ email });
    }catch(err){
        console.errors(err.message);
        res.status(500).send('Server Error');
    }

    if(!user){
        return res.status(403).json({ msg: 'Invalid credentials, could not log you in.'});
    }

    let isPasswordMatch = false;
    try{
        isPasswordMatch = await bcrypt.compare(password, user.password);
    }catch(err){
        console.errors(err.message);
        res.status(500).send('Server Error');
    }
    if(!isPasswordMatch){
        return res.status(403).json({ msg: 'Invalid credentials, could not log you in.'});
    }

    let token;
    try{
        token = jwt.sign(
            {userId: user.id, name: user.name},
            process.env.JWT_SECRET, 
            {expiresIn: '1h'});
    }catch(err){
        console.errors(err.message);
        res.status(500).send('Server Error');
    };

    res.json({userId: user.id, name: user.name, token: token});
};

exports.loginUser = loginUser;
exports.registerUser = registerUser;
