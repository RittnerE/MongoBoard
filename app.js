const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

//import routes
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

const boardsRoute = require('./routes/boards');
app.use('/boards', boardsRoute);

//routes
app.get('/', (req, res) => {
    res.send('Homescreen | HellOwOrld');
});

//test mongodb connection
mongoose.connect('mongodb://localhost:27017',
    {
        user: 'root',
        pass: 'test',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    () => {
    console.log('connected to MongoDB');
});

//start server
app.listen(3000);
