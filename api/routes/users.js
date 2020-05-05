const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          error: 'Email already exists',
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              username: req.body.username,
              password: hash,
              createdAt: new Date().toISOString(),
            });
            user
              .save()
              .then((result) => {
                res.status(200).json({
                  message: 'User Created',
                });
              })
              .catch((err) => {
                res.status(500).json({ error: err });
              });
          }
        });
      }
    })
    .catch();
});

router.post('/login', (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        res.status(401).json({
          error: 'Authorization failed',
        });
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          res.status(401).json({
            error: 'Authorization failed',
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h',
            }
          );
          return res.status(200).json({
            message: 'Authorization successful',
            token: token,
          });
        }

        return res.status(401).json({
          error: 'Authorization failed',
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.get('/:userId', (req, res, next) => {
  User.findById({ _id: req.params.userId })
    .exec()
    .then((user) => {
      res.status(200).json({
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.delete('/:userId', (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({ message: 'User deleted' });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;

// const defaultPhoto = (req, res) => {
//     return res.sendFile(process.cwd()+profileImage)
//   }
