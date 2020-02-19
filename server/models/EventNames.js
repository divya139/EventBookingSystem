const mongoose = require("mongoose");

const EventNamesSchema = new mongoose.Schema({
  eventName: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("EventNames", EventNamesSchema);
