const express = require('express');
const Cors = require('cors');

const  app = express();
const router = require('./Routes/formPage');
const sequelize = require('./Models/User');

app.use(Cors());
app.use(express.json()); // use to send data as an object and get 

app.use('/',router);

sequelize.sync().then( () => {
    app.listen(4000);
}).catch(err => console.log(err));

// console.log('WEOLCOME TO BOOKING MANAGEMENT APP BACKEND CODE');