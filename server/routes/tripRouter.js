const express = require('express');
const tripController = require('../controllers/tripController');

const router = express.Router();

// create a new trip
router.post('/create',
  tripController.createTrip,
  (req, res, next) => {
    res.status(200).json(res.locals.newTrip);
  });

// get specific trip info
router.get('/:tripId',
  tripController.getTripById,
  (req, res, next) => {
    res.status(200).json(res.locals.trip);
  });

// update specific trip
router.patch('/:tripId',
  tripController.updateTrip,
  (req, res, next) => {
    res.status(200).json({ [res.locals.updateField]: res.locals.updatedFieldValue });
  });

// delete specific trip
router.delete('/:tripId',
  tripController.deleteTrip,
  (req, res, next) => {
    res.status(200).json({ 'deleteSuccess': res.locals.deleteSuccess });
  });

// get all finalStop markers for the main map
// router.get('/markers/all',
//   tripController.getAllMarkers,
//   (req, res, next) => {
//     res.status(200).json(res.locals.markers);
//   });

module.exports = router;
