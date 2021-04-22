const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./route/userRouter');
const todoRouter = require('./route/todoRouter');
const globalErrorHandler = require('./controllers/errorHandler');


dotenv.config({path: path.join(__dirname, 'config.env')});

const db = mongoose.connection;

mongoose.connect(process.env.MONGO_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected!'));

db.on('error', (err) => {
    console.log('DB connection error:', err.message);
})

//MIDDLEWARE
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
// app.use(upload.array()); 
app.use(cors());

app.use('/api/user', userRouter);

app.use('/api/todo', todoRouter);

app.all('*', (req, res, next) => {
    next(new appError(404, 'invalid URL'));
});

app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
    console.log(`connect to port ${process.env.PORT}`);
})