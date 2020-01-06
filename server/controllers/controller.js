//need to rename this file, set better middleware names and make actual queries that use logic to change the query information into tangible data for our frontend to use to change the state

const db = require('../models/dbModel');

const controller = {};


//controller.getUser submits a query to the database to get all the users. this is mostly for a test and a general template of how to make queries in the future
controller.getUser = (req, res, next) => {
    const userQuery = 
    `SELECT * FROM users;`;
    db.query(userQuery)
        .then(data => {
            res.locals.users = data.rows;
            console.log(res.locals.users);
            return next();
        })
        .catch(err => {
            return next(err);
        })
}


// middleware to get all markers
controller.getMarkers = (req, res, next) => {
    const markersQuery =
    `SELECT users.id, users.username, location.longitude, location.latitude
    FROM users
    LEFT OUTER JOIN location
    ON location.users_id = users.id;`;
    db.query(markersQuery)
        .then(markersList => {
            res.locals.markersList = markersList.rows;
            console.log('res locals markerslist', res.locals.markersList)
            return next();
        })
        .catch(err => {
            return next(err);
        })
}

// route to add one marker
controller.addMarker = (req, res, next) => {
    const { longitude, latitude } = req.body;
    const addMarkerQuery = 
    `INSERT INTO location (longitude, latitude, users_id)
    VALUES ('${longitude}', '${latitude}', 1);`
    db.query(addMarkerQuery)
        .then(newMarker => {
            return next();
        })
        .catch(err => {
            return next(err);
        })
}

// route to get single marker data
controller.getOneMarker = (req, res, next) => {
    // ---------- need to test req.body from front end post request to ensure keys are consistent ------
    const { longitude, latitude } = req.body;

    const getOneMarkerQuery = 
    `SELECT * FROM location
    JOIN images 
    ON location.location_id = images.location_id
    WHERE location.longitude = '${longitude}' AND location.latitude = '${latitude}';`;
    db.query(getOneMarkerQuery) 
        .then(oneMarker => {
            res.locals.oneMarker = oneMarker.rows;
            console.log(res.locals.oneMarker);
            return next();
        })
        .catch(err => {
            return next(err);
        })
}

// create marker route (on form submit)
controller.updateMarker = (req, res, next) => {
    // --------- need to test req.body from front end post request to ensure keys are consistent ------
    const { latitude, longitude, description, tag, location, urls } = req.body;
    const updateMarkerQuery =
    `BEGIN TRANSACTION;
    UPDATE location
    SET description = '${description}', tag = '${tag}', location = '${location}'
    WHERE latitude = '${latitude}' AND longitude = '${longitude}';
    UPDATE images
    SET urls = '${urls}'
    FROM location
    WHERE images.location_id = location.location_id;
    COMMIT;`
    db.query(updateMarkerQuery)
        .then(updatedMarker => {
            res.locals.updatedMarker = updatedMarker;
            console.log('res.locals.updatedMarker:', res.locals.updatedMarker);
            return next();
        })
        .catch(err => {
            return next(err);
        })
}



module.exports = controller;