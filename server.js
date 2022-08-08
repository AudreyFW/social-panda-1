const express = require('express');
const fileUpload = require('express-fileupload');

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

//add it : 8.08
const port = process.env.PORT || 5000;
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV ===  'staging') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
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

//server, changement de process.env.PORT à port
app.listen(port, ()=>{
    console.log(`Listening on port ${process.env.PORT}`);
});