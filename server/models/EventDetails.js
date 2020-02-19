const eventDetails = {
  vendorName: {
    type: [],
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  proposedDates: {
    type: String,
    default: Date.now()
  },
  confirmedDate: {
    type: Date,
    default: null
  },
  dateCreated: {
    type: Date,
    default: new Date()
  },
  status: {
    type: String,
    default: "Pending"
  },
  remarks: {
    type: String,
    default: ""
  },
  isActive: {
    type: Boolean,
    default: true
  }
};
module.exports = eventDetails;
