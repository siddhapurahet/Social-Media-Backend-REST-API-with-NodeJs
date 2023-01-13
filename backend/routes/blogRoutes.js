const express = require('express');
const blogrouter = express.Router();
const getAllblogs = require('../controllers/blogController');
const addBlog = require('../controllers/blogController');
const updateBlog = require('../controllers/blogController');
const getBlog = require('../controllers/blogController');
const deleteBlog = require('../controllers/blogController');
const getuserBlog = require('../controllers/blogController');

blogrouter.get('/',getAllblogs);
blogrouter.post('/addblog', addBlog);
blogrouter.put('/update/:id', updateBlog);
blogrouter.get('/getblog/:id', getBlog);
blogrouter.delete('/delete/:id', deleteBlog);
blogrouter.get('/user/:id', getuserBlog);

module.exports = blogrouter;