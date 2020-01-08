const mongoose = require("mongoose");
const pointSchema = require('./pointSchema');
const finalStopSchema = require('./finalStopSchema')

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tripSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  comments: [
    {
      user: { type: ObjectId, ref: 'User' },
      body: String,
      date: Date
    }
  ],
  stops: [
    {
      index: Number,
      location: {
        type: pointSchema,
        required: true
      },
      next_stop: { type: Number, default: null },
      previous_stop: { type: Number, default: null },
      pics: [String],
      stop_comments: [
        {
          user: { type: ObjectId, ref: 'User' },
          body: String,
          date: Date
        }
      ]
    }
  ],
  finalStop: { type: finalStopSchema }
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
