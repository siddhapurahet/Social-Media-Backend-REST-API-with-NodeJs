const user = require('../model/User');
const bcryptpass = require('bcrypt');

const getAlluser = async (req, res, next) => {
    let users;
    try{
        users = await user.find();
    }
    catch (err) {
        console.log(err);
    }
    if(!users){
        res.status(404).json({message: 'No user found'});
    }
    else{
        res.status(200).json({users});
    }
}


const signUp = async(req, res, next) => {
    const {name, email, password} = req.body;
    let newuser;
    try{
        newuser = await user.findOne({email});
    }
    catch (err){
        return console.log(err);
    }
    if(newuser){
        return res.status(400).json({message: "User already exists"});
    }
    const salt = await bcryptpass.genSalt(8);
    const hashedpass = bcryptpass.hashSync(password, salt);
    const makeuser = new user({
        name,
        email,
        password: hashedpass,
        blogs: []
    });
    try{
        await makeuser.save();
    }
    catch (err){
        return console.log(err);
    }
    return res.status(201).json({makeuser});
}

const login = async(req, res, next) => {
    const {email, password} = req.body;
    let userlogin;
    try{
        userlogin = await user.findOne({email});
    }
    catch(err){
        return console.log(err);
    }
    if(!userlogin){
        return res.status(404).json({message: "User not found"});
    }
    const passwordcheck = bcryptpass.compareSync(password, userlogin.password);
    if(!passwordcheck){
        return res.status(400).json({message:"Incorrect password"});
    }
    return res.status(200).json({message: "Login Successfull"});
}

module.exports = getAlluser;
module.exports = signUp;
module.exports = login;