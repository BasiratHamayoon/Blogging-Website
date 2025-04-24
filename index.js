const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db.js');
const multer = require('multer');
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();

//Routes
const userRoute = require('./Routes/userRoute.js');
const postRoutes = require('./Routes/postRoute.js');
// const userRoutes = require('./routes/user.js');
// const commentRoutes = require('./routes/comment.js');
// const savedPostRoutes = require('./routes/savedPosts.js');


connectDB();

const app = express();

app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/posts', postRoutes);  
// app.use('/api/users', userRoutes);
// app.use('/api', commentRoutes);
// app.use('/api/saved-posts', savedPostRoutes);



const port = process.env.PORT;
app.listen(port, () => console.log(`http://localhost:${port} is now running!`));