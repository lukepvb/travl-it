const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

const TripSchema = new Schema({
  user: String,
  date: { type: Date, default: Date.now },
  comments: [
    {
      user: ObjectId,
      body: String,
      date: Date
    }
  ],
  stops: [
    {
      index: Number,
      coordinates: [String],
      next_stop: { type: Number, default: null },
      previous_stop: Number,
      pics: [String],
      stop_comments: [
        {
          user: ObjectId,
          body: String,
          date: Date
        }
      ]
    }
  ]
});

module.exports = Trip = mongoose.model("Trip", TripSchema);
