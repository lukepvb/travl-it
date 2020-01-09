const Trip = require("../models/tripModel");

const tripController = {};

tripController.getTripById = (req, res, next) => {
  const { tripId } = req.params;

  Trip.findById(tripId)
    .exec()
    .then(tripDoc => {
      res.locals.trip = tripDoc;
      return next();
    })
    .catch(err => {
      return next({
        log: `ERROR: tripController.findById: ERROR: ${err}`,
        message: `ERROR: tripController.findById: ERROR: see server log for details`
      });
    });
};

tripController.createTrip = (req, res, next) => {
  const { user, date, comments, stops, finalStop } = req.body;
  Trip.create({
    user,
    date,
    comments,
    stops,
    finalStop
  })
    .then(tripDoc => {
      Trip.findByIdAndUpdate(tripDoc._id, { 'finalStop.tripId': tripDoc._id }, { new: true })
        .exec()
        .then(updatedTrip => {
          const newTrip = updatedTrip;
          res.locals.newTrip = newTrip;
          return next();
        })
        .catch(err => {
          return next({
            log: `ERROR: tripController.createTrip: ERROR: ${err}`,
            message: `ERROR: tripController.createTrip: ERROR: see server log for details`
          });
        });
    })
};

tripController.deleteTrip = (req, res, next) => {
  const { tripId } = req.params;

  Trip.findByIdAndDelete(tripId)
    .exec()
    .then(tripDoc => {
      res.locals.deleteSuccess = true;
    })
    .catch(err => {
      return next({
        log: `ERROR: tripController.deleteTrip: ERROR: ${err}`,
        message: `ERROR: tripController.deleteTrip: ERROR: see server log for details`
      });
    });
};

tripController.updateTrip = (req, res, next) => {
  const { updateField, updateValue } = req.body;
  const { tripId } = req.params;
  // use a 'setter' object to dynamically set the field to be updated
  // based on the 'updateField' sent in the request body
  const setObj = {};
  setObj[updateField] = updateValue;
  Trip.findByIdAndUpdate(tripId, setObj)
    .exec()
    .then(updatedTrip => {
      const newTrip = updatedTrip;
      res.locals.updateField = updateField;
      res.locals.updatedFieldValue = newTrip[updateField];
      return next();
    })
    .catch(err => {
      return next({
        log: `ERROR: tripController.updateTrip: ERROR: ${err}`,
        message: `ERROR: tripController.updateTrip: ERROR: see server log for details`
      });
    });
};

// find all trips, runs on main map load
tripController.findAllDestinations = (req, res, next) => {
  Trip.find({})
    .exec()
    .then(trips => {
      const tripsList = trips;
      const destinations = [];
      tripsList.forEach(trip => {
        if (trip.finalStop) {
          destinations.push(trip.finalStop);
        }
      });
      res.locals.destinations = destinations;
      return next();
    })
    .catch(err => {
      return next({
        log: `ERROR: tripController.findAllDestinations: ERROR: ${err}`,
        message: `ERROR: tripController.findAllDestinations: ERROR see server log for details`
      });
    });
};

module.exports = tripController;
