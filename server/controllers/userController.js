const User = require("../models/userModel");

const userController = {};

// Create new user in the database

// getUserByUsername - retrieve all users from the database by username and store it into res.locals
// before moving on to next middleware.

userController.getUserByUsername = (req, res, next) => {
  User.find({ username: req.body.username }, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err)
      return next(
        "Error in userController.getUserByUsername: " + JSON.stringify(err)
      );

    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};
