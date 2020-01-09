//need to create actual routes that will 1. receive a fetch request from the frontend
//2. send information to the database to save
//3. parse through the information (from the db query) and send that information back to the frontend so we can use it to change the state

const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cloudinary = require("cloudinary");
const formData = require("express-form-data");

const PORT = 3000;

const app = express();

const userController = require("./controllers/userController");

const db = require("./config/keys").mongoURI;

// connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(`DATABASE ERROR ${err}`));

app.use(formData.parse());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// route to get all markers and main page
/**
 * handle requests for static files
 */
app.use("/assets", express.static(path.join(__dirname, "./assets")));

if (process.env.NODE_ENV === "production") {
  // statically serve everything in the build folder on the route '/build'
  app.use("/build", express.static(path.join(__dirname, "../build")));
  // serve index.html on the route '/'
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
  });
}

// app.get("/api", userController.getMarkers, (req, res) => {
//   res.status(200).json({ markersList: res.locals.markersList });
// });
// // route to create a marker on first click
// app.post("/addMarker", userController.addMarker, (req, res) => {
//   res.status(200).send("Marker created!");
// });

// app.post("/addImage", userController.addImage, (req, res) => {
//   res.status(200).json(res.locals.newImgURL);
// });

// // route to update marker when you submit form
// app.patch(
//   "/updateMarker",
//   userController.updateMarker,
//   userController.getOneMarker,
//   (req, res) => {
//     res.status(200).json({ updatedMarker: res.locals.oneMarker });
//   }
// );

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../client/index.html"));
});

// Get a specific user by their username
app.use("", userController.getUserByUsername, (req, res) => {
  res.status(200).send("Query successfull: Got specific user by username!");
});

// Create and add new user to the database
app.post("/users", userController.createUser, (req, res) => {
  res.status(200).send("Success: New user created in database!");
});

app.use("*", (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "An error occurred" }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;
