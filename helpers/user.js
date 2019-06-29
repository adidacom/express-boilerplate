const User = require('../models/user');

exports.setUserInfo = function setUserInfo(request) {
  const getUserInfo = {
    firstname: request.firstname,
    lastname: request.lastname,
    email: request.email,
  };

  return getUserInfo;
};
