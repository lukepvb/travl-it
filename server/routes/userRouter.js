const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/create", userController.createUser, (req, res, next) => {
  res.status(200).json(res.locals.newUser);
});

router.get("/:username", userController.getUserByUsername, (req, res, next) => {
  res.status(200).json(res.locals.user);
});

router.delete(
  "/:username",
  userController.deleteUserByUsername,
  (req, res, next) => {
    res.sendStatus(200);
  }
);

module.exports = router;
