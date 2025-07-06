const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const isUserExist = await User.findOne({email});
        if(isUserExist){
            return res.status(400).json({message: "User exists already"});
        }
        const hashedPw = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPw});
        return res.status(201).json({message: 'Register successfully'});
    }
    catch (err){
        return res.status(500).json({message: err});
    }
};

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user)
        {
            return res.status(400).json({message: "User does not exist"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if( !isPasswordValid ){
            return res.status(400).json({message: "Password is incorrect"});
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        return res.json({token});
    }
    catch(err){
        return res.status(500).json({message: err});
    }
}

module.exports = {register, login};