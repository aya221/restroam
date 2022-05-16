const express = require("express");
const mongoose = require('mongoose');
const usersRoutes = require('./api/routes/users');

const app = new express();
const port = 3000;

const clusterUsername = 'groupJ';
const clusterPassword = 'SbPotmFKy5V8tyBF';
const databaseName = 'myFirstDatabase';

mongoose.connect(
    `mongodb+srv://${clusterUsername}:${clusterPassword}@cluster0.2l3zw.mongodb.net/${databaseName}?retryWrites=true&w=majority`,
    // {
    //     useNewUrlParser: true,
    //     useFindAndModify: false,
    //     useUnifiedTopology: true,
    // }
);

const db = mongoose.connection;
db.on('error', () => {console.log('ZEBI')});
db.once("open", function () {
    console.log("Connected successfully");
});

app.use('/users', usersRoutes);

app.get('/', (req, res) => {
    res.status(500).send('Hello World');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});