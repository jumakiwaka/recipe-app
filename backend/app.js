const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./routes/stuff');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const path = require('path');

// Mongodb Pass: myTA0Myu85O5h9SK;
// Mongodb conn: mongodb+srv://Juma_Kiwaka:myTA0Myu85O5h9SK@cluster0-5mh4u.mongodb.net/test?retryWrites=true&w=majority;

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://Juma_Kiwaka:myTA0Myu85O5h9SK@cluster0-5mh4u.mongodb.net/test?retryWrites=true&w=majority').then(() => {
  console.log('Database connected successfully!');
}).catch((err) => {
  console.log('Failed to connect due to:');
  console.error(err);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  next();
});


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', productRouter);
app.use('/api/auth', userRouter);

module.exports = app;
