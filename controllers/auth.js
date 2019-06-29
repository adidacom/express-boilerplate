const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/keys');
const setUserInfo = require('../helpers/user').setUserInfo;

function generateToken(user) {
  return jwt.sign(user, config.secretOrKey, {
    expiresIn: 604800, // in seconds
  });
}

exports.signIn = function(req, res) {
  const userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo,
  });
};

exports.signUp = function(req, res, next) {
  const { firstname, lastname, email, password } = req.body;

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    // If user is not unique, return error
    if (existingUser) {
      return res
        .status(422)
        .send({ error: 'That email address is already in use.' });
    }
    // If email is unique and password was provided, create account
    const user = new User({
      firstname,
      lastname,
      email,
      password,
    });

    user.save((err, user) => {
      if (err) {
        return next(err);
      }

      const userInfo = setUserInfo(user);

      res.status(200).json({
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo,
      });
    });
  });
};

exports.signOut = function(req, res) {
  req.logout();

  //  console.log(req.isAuthenticated());

  res.status(200).json({ message: 'Successfully logged out' });
};

exports.viewProfile = function(req, res) {
  User.findOne({ email: req.user.email })
    .then(foundUser => {
      res.status(200).json({
        success: true,
        user: setUserInfo(foundUser),
      });
    })
    .catch(err => {
      res.status(404).send({ message: 'user not found' });
    });
};
