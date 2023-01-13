const { mongo, default: mongoose } = require('mongoose');
const blogs = require('../model/Blog');

const getAllblogs = async (req, res, next) => {
    let getblogs;
    try{
        getblogs = await blogs.find();
    }
    catch(err) {
        console.log(err);
    }
    if(!getblogs){
        res.status(404).json({message: "Blogs not found"});
    }
    res.status(200).json({getblogs});
}

const addBlog = async (req, res, next) => {
    const {title, description, image, user} = req.body;
    let existinguser;
    try{
        existinguser = await User.findById(user);
    }
    catch(err){
        console.log(err);
    }
    if(!existinguser){
        return res.status(400).json({message: "Unable to find uer with this ID"});
    }
    const createblog = new blogs({
        title,
        description,
        image,
        user,
    });
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await createblog.save({session});
        existinguser.blogs.push(createblog);
        await existinguser.save({session});
        await session.commitTransaction();
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({message: err});
    }
    return res.status(200).json({createblog});
};

const updateBlog = async (req, res, next) => {
    const {title, description} = req.body;
    const blogId = req.params.id;
    let updateblog;
    try{
        updateblog = await blogs.findByIdAndUpdate(blogId, {
            title,
            description
        })
    }
    catch(err){
        return console.log(err);
    }
    if(!updateblog){
        return res.status(500).json({message: "Unable to Update"});
    }
    return res.status(200).json({updateblog});
};

const getBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try{
        blog = await blogs.findById(id);
    }
    catch(err) {
        return res.status(404).json({message: "blog not found"});
    }
    if(!blog){
        res.status(404).json({message: "No blog found"});
    }
    return res.status(200).json({blog});
}

const deleteBlog = async (req, res, next) => {
    const id = req. params.id;
    let blog;
    try{
        blog = await blogs.findByIdAndRemove(id).populate('User');
        await blog.User.blogs.pull(blog);
        await blog.User.save();
    }
    catch(err) {
        console.log(err);
    }
    if(!blog){
        return res.status(500).json({message: "Not found"});
    }
    return res.status(200).json({message: "Successfully deleted"});
}

const getuserBlog = async (req, res, next) => {
    const userid = req.params.id;
    let userblogs;
    try{
        userblogs = await User.findById(userid).populate('blog')
    }
    catch(err){
        console.log(err);
    }
    if(!userblogs){
        return res.status(404).json({message: "No blog found"});
    }
    return res.status(200).json({blogs: userblogs});
}

module.exports = getAllblogs;
module.exports = addBlog;
module.exports = updateBlog;
module.exports = getBlog;
module.exports = deleteBlog;
module.exports = getuserBlog;