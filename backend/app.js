const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/userRoutes');
const blogrouter = require('./routes/blogRoutes');

const app = express();
app.use(express.json());
app.use('/api/users', router);
app.use('/api/blogs', blogrouter);

mongoose.connect ('mongodb+srv://admin:admin@cluster0.kko61md.mongodb.net/Blog?retryWrites=true&w=majority')
    .then(() =>app.listen(5000))
    .then(() => console.log('connected to database and port is 5000'))
    .catch((err) => console.log(err));




//const port = process.env.PORT || 5000;

//app.listen(port, console.log(`Listening on port ${port}`));

