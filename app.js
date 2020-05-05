const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(
  'mongodb+srv://justin:' +
    process.env.MONGO_PW +
    '@cluster0-ar4wa.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const postsRoute = require('./api/routes/posts');
const usersRoute = require('./api/routes/users');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/posts', postsRoute);
app.use('/users', usersRoute);

app.use((req, res, next) => {
  const error = new Error('Not found');
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
