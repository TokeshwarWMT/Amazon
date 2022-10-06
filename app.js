require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const multer = require('multer')
const app = express();

const user = require('./routes/user.js');
const seller = require('./routes/seller.js');
const category = require('./routes/category.js');
const product = require('./routes/product.js');
const review = require('./routes/review.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().any());
app.use('/', user);
app.use('/seller', seller);
app.use('/', category);
app.use('/', product);
app.use('/', review);

let uri = process.env.MONGODB_URL;

mongoose.connect(uri)
    .then(() => console.log('MongoDB Connection Successful..'))
    .catch(e => console.log(e))

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Express App is running on ${port} 🚀🚀`)
});


