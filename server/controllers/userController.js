const User = require("../models/userModel");

const userController = {};

/* Create new user in the database */

userController.createUser = (req, res, next) => {
  const { name, username, password, email } = req.body;

  User.create({
    name,
    username,
    password,
    email
  })
    .then(newUser => {
      res.locals.newUser = newUser;
      return next();
    })
    .catch(err => {
      return next({
        log: `ERROR: userController.createUser: ERROR ${err}`,
        message: `ERROR: userController.createUser: ERROR see server log for details`
      });
    });
};

/* getUserByUsername - retrieve all users from the database by username and store it into res.locals */

userController.getUserByUsername = (req, res, next) => {
  const { username } = req.body;

  User.find({ username })
    .exec()
    .then(user => {
      console.log;
      res.locals.user = user;
      return next();
    })
    .catch(err => {
      return next({
        log: `ERROR: userController.getUserByUsername: ERROR ${err}`,
        message: `ERROR: userController.getUserByUsername: ERROR see server log for details`
      });
    });
};

/* deleteUser = delete a user by username from the database */

userController.deleteUserByUsername = (req, res, next) => {
  const { username } = req.body;

  User.findOneAndDelete({ username })
    .exec()
    .then(user => {
      console.log("User Deleted: ", user);
      res.locals.userDeleted = true;
      return next();
    })
    .catch(err => {
      return next({
        log: `ERROR: userController.deleteUserByUsername: ERROR: ${err}`,
        message: `ERROR: userController.deleteUserByUsername: ERROR: see server log for details`
      });
    });
};

module.exports = userController;
