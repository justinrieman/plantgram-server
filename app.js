const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

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
  console.log(process.env.SECRET);
});
