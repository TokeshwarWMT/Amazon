require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const user = require('./routes/user.js');
const seller = require('./routes/seller.js');
const category = require('./routes/category.js');
const product = require('./routes/product.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', user);
app.use('/seller', seller);
app.use('/', category);
app.use('/', product);

let uri = process.env.MONGODB_URL;

mongoose.connect(uri)
    .then(() => console.log('MongoDB Connection Successful..'))
    .catch(e => console.log(e))

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Express App is running on ${port} 🚀🚀`)
});