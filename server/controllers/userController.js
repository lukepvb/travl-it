const User = require("../models/userModel");

const userController = {};

/* Check to see if a user exists by email and username in the database on signup */
userController.verifyUser = (req, res, next) => {
  // pull out the username and password from the body of the request
  const { username, password } = req.body;

  // check the database to find all users that match the given data
  User.find({ username, password })
    .exec()
    .then(userData => {
      // set isVerified flag to false initially
      let isVerified = false;

      // if the the specific username and password are found in database, set isVerified to true
      if (
        userData[0].username === username &&
        userData[0].password === password
      ) {
        isVerified = true;
        res.locals.isVerified = isVerified;

        console.log("User successfully verified!");
        return next();
      }
      next();
    })
    .catch(err => {
      return next({
        log: `ERROR: userController.verifyUser: ERROR ${err}`,
        message: `ERROR: userController.verifyUser: ERROR see server log for details`
      });
    });
};

/* Create new user in the database */

userController.createUser = (req, res, next) => {
  const { name, username, password, email } = req.body;

  User.create({
    name,
    username, // required
    password,
    email // required
  })
    .then(newUser => {
      res.locals.newUser = newUser;
      console.log("New User Added to the Database!");
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
  const { username } = req.params;

  User.find({ username })
    .exec()
    .then(user => {
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
  const { username } = req.params;

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
