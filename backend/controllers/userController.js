const user = require('../model/User');

const getAlluser = async (req, res) => {
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

module.exports = getAlluser;