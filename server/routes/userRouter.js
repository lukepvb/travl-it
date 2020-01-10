const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');

router.post('/signup', userController.createUser, (req, res, next) => {
  res.status(200).json(res.locals.newUser);
});

// login
router.post(
  '/login',
  userController.verifyUser,
  cookieController.setCookie,
  (req, res, next) => {
    //based on boolean, redirect to either app or signup
    res.status(200).json(res.locals.isVerified);
  }
);

router.get('/:username', userController.getUserByUsername, (req, res, next) => {
  res.status(200).json(res.locals.user);
});

router.delete(
  '/:username',
  userController.deleteUserByUsername,
  (req, res, next) => {
    res.sendStatus(200);
  }
);

module.exports = router;
