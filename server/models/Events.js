const mongoose = require("mongoose");
const eventDetails = require("../models/EventDetails");

const EventsSchema = new mongoose.Schema({
  eventName: {
    type: String,
    default: ""
  },
  hrId: {
    type: String,
    default: ""
  },
  eventDetails: {
    type: eventDetails
  }
});

module.exports = mongoose.model("Events", EventsSchema);
