const User = require("../models/userModel");

const userController = {};

// Create new user in the database

// getUserByUsername - retrieve all users from the database by username and store it into res.locals
// before moving on to next middleware.

userController.getUserByUsername = (req, res, next) => {
  const { username } = req.body;
  User.find({ username }, (err, user) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) {
      return next(
        "Error in userController.getUserByUsername: " + JSON.stringify(err)
      );
    }

    // store retrieved users into res.locals and move on to next middleware
    res.locals.user = user;
    console.log(res.locals);
    return next();
  });
};

module.exports = userController;
