const express = require('express');
const router = express.Router();

router.get('/:username', (req, res, next) => {
  res
    .status(200)
    .json({ message: 'The user you are reaching is ' + req.params.username });
});

router.post('/login', (req, res, next) => {});

router.post('/signup', (req, res, next) => {});

module.exports = router;
