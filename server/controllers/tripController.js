const Trip = require('../models/tripModel');

const tripController = {};

tripController.getTripById = (req, res, next) => {
  const { tripId } = req.params.tripId;

  Trip.findById(tripId)
    .exec()
    .then(tripDoc => {
      res.locals.trip = tripDoc;
      return next()
    })
    .catch(err => {
      return next({
        log: `ERROR: tripController.findById: ERROR: ${err}`,
        message: `ERROR: tripController.findById: ERROR: see server log for details`,
      });
    });
}

tripController.createTrip = (req, res, next) => {
  const {
    user,
    date,
    comments,
    stops,
    finalStop,
  } = req.body;

  Trip.create({
    user,
    date,
    comments,
    stops,
    finalStop
  })
    .then(tripDoc => {
      res.locals.newTrip = tripDoc;
      return next();
    })
    .catch(err => {
      return next({
        log: `ERROR: tripController.createTrip: ERROR: ${err}`,
        message: `ERROR: tripController.createTrip: ERROR: see server log for details`,
      });
    });
}

tripController.deleteTrip = (req, res, next) => {
  const { tripId } = req.body;

  Trip.findByIdAndDelete(tripId)
    .exec()
    .then(tripDoc => {
      console.log('Doc Deleted: ', tripDoc);
      res.locals.tripDeleted = true;
    })
    .catch(err => {
      return next({
        log: `ERROR: tripController.deleteTrip: ERROR: ${err}`,
        message: `ERROR: tripController.deleteTrip: ERROR: see server log for details`,
      });
    });
}

tripController.updateTrip = (req, res, next) => {
  const { updateField, updateValue, tripId } = req.body;
  // use a 'setter' object to dynamically set the field to be updated
  // based on the 'updateField' sent in the request body
  const setObj = {};
  setObj[updateField] = updateValue;

  Trip.findByIdAndUpdate(tripId, setObj)
    .exec()
    .then(updatedTrip => {
      res.locals.updatedFieldValue = updatedTrip[updateField];
    })
    .catch(err => {
      return next({
        log: `ERROR: tripController.updateTrip: ERROR: ${err}`,
        message: `ERROR: tripController.updateTrip: ERROR: see server log for details`,
      });
    });
}

module.exports = tripController;
