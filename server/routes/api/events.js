const Events = require("../../models/Events");
const EventNames = require("../../models/EventNames");
const _eventDetails = require("../../models/EventDetails");
module.exports = app => {
  /* -----API to get event details-----*/
  app.get("/api/events/getDetails", (req, res, next) => {
    const { query } = req;
    const { hrId } = query;
    Events.find({ hrId: hrId }, (err, result) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server Error"
        });
      }
      return res.send({
        success: true,
        data: result
      });
    });
  });
  /*----API to create/save new event----*/
  app.post("/api/events/create", (req, res, next) => {
    const { body } = req;
    const {
      eventName,
      vendorName,
      location,
      proposedDates,
      confirmedDate,
      status,
      remarks,
      hrId
    } = body;

    /*----save the new event in database----*/

    _eventDetails.vendorName = vendorName;
    _eventDetails.location = location;
    _eventDetails.proposedDates = proposedDates;
    _eventDetails.confirmedDate = confirmedDate;
    _eventDetails.dateCreated = new Date();
    _eventDetails.status = status;
    _eventDetails.remarks = remarks;

    const newEvent = new Events();
    newEvent.eventName = eventName;
    newEvent.eventDetails = _eventDetails;
    newEvent.hrId = hrId;

    newEvent.save((err, event) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: "Error: Server Error"
        });
      }
      return res.send({
        success: true,
        message: "Saved Event Successfully!"
      });
    });
  });

  /*----API to update event status----*/
  app.post("/api/events/updateStatus", (req, res, next) => {
    const { body } = req;
    const {
      _id,
      vendorName,
      proposedDates,
      confirmedDate,
      dateCreated,
      status,
      remarks,
      userId
    } = body;

    _eventDetails.vendorName = vendorName;
    _eventDetails.proposedDates = proposedDates;
    _eventDetails.confirmedDate = confirmedDate;
    _eventDetails.status = status;
    _eventDetails.remarks = remarks;
    _eventDetails.userId = userId;
    _eventDetails.dateCreated = dateCreated;

    Events.findOneAndUpdate(
      {
        _id: _id
      },
      {
        $set: { eventDetails: _eventDetails }
      },
      null,
      (err, sessions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server Error"
          });
        }

        return res.send({
          success: true,
          message: "Updated Successfully!"
        });
      }
    );
  });

  /*----API to get vendor events----*/
  app.get("/api/events/getVendorEvents", (req, res, next) => {
    const { query } = req;
    const { vendor } = query;
    Events.find({ "eventDetails.vendorName": vendor }, (err, result) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server Error"
        });
      }
      return res.send({
        success: true,
        data: result
      });
    });
  });
  /*----API to get event names----*/
  app.get("/api/events/getEvents", (req, res, next) => {
    const { query } = req;
    const { id } = query;
    EventNames.find({}, (err, result) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server Error"
        });
      }
      return res.send({
        success: true,
        data: result
      });
    });
  });
};
