//need to rename this file, set better middleware names and make actual queries that use logic to change the query information into tangible data for our frontend to use to change the state

const db = require('../models/dbModel');

const controller = {};


//controller.getUser submits a query to the database to get all the users. this is mostly for a test and a general template of how to make queries in the future
controller.getUser = (req, res, next) => {
    const userQuery = 
    `SELECT * FROM users;`;
    db.query(userQuery)
        .then(data => {
            res.locals.users = data;
            console.log(data);
            return next();
        })
        .catch(err => {
            return next(err);
        })
}

module.exports = controller;