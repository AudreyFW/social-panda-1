const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');


require('dotenv').config({path: './config/.env'});
require('./config/db');
const cors = require('cors');

const {checkUser, requireAuth }= require('./middleware/auth.middleware');

const app = express();

const corsOptions={
    origin: process.env.CLIENT_URL,
    credentials: true, 
        'allowedHeaders': ['sessionId', 'Content-Type'],
        'exposedHeaders': ['sessionId'],
        'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        'preflightContinue': false
}




app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res)=>{
    res.status(200).send(res.locals.user._id);
});

//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client/build')));

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, './client/build', 'index.html'));
    });
}

app.listen(process.env.PORT, ()=>{
    console.log(`Listening on port ${process.env.PORT}`);
});