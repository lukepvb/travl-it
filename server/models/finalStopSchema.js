const mongoose = require('mongoose');
const pointSchema = require('./pointSchema');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const finalStopSchema = new Schema({
  location: { type: pointSchema, required: true },
  trip: { type: ObjectId, required: true }
});

module.exports = finalStopSchema;
