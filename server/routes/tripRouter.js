const express = require('express');

const router = express.Router();

const tripController = require('../controllers/tripController');

router.get('/:tripId',
  tripController.getTripById,
  (req, res, next) => {
    res.status(200).json(res.locals.trip);
  });


module.exports = router;