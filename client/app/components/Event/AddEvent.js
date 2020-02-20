import React, { Component } from "react";
import { STATUS, PROXY_URL, LOCATION_URL } from "../../utils/constants";
import EventDetails from "./EventDetails";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { getFromStorage, setInKey } from "../../utils/storage";
import { APIKey, APISecure } from "../../utils/config";
import { alert } from "../alerts/alerts";

class AddEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postalCode: "658071",
      companyName: "",
      events: [],
      vendorNames: [],
      eventName: "",
      vendorName: "",
      proposedDates: [],
      streetName: "",
      proposedDateOne: "",
      proposedDateTwo: "",
      proposedDateThree: "",
      hrId: "",
      addEvent: false
    };
    this.findAddress = this.findAddress.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.onEventSelect = this.onEventSelect.bind(this);
    this.onVendorSelect = this.onVendorSelect.bind(this);
    this.onProposedDateOneSelect = this.onProposedDateOneSelect.bind(this);
    this.onProposedDateTwoSelect = this.onProposedDateTwoSelect.bind(this);
    this.onProposedDateThreeSelect = this.onProposedDateThreeSelect.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage("the_user_details");
    this.setState({
      companyName: obj.userData.company,
      hrId: obj.userData._id
    });
    fetch("http://localhost:8080/api/events/getEvents")
      .then(res => res.json())
      .then(data => {
        this.setState({ events: data.data });
      })
      .catch(console.log);
    fetch("http://localhost:8080/api/vendor/getVendor")
      .then(res => res.json())
      .then(data => {
        this.setState({ vendorNames: data.data });
      })
      .catch(console.log);
  }
  /*---on choosing one proposed date---*/
  onProposedDateOneSelect(e) {
    this.setState({
      proposedDateOne: e.target.value
    });
  }
  /*---on choosing two proposed date---*/
  onProposedDateTwoSelect(e) {
    this.setState({
      proposedDateTwo: e.target.value
    });
  }
  /*---on choosing three proposed date---*/
  onProposedDateThreeSelect(e) {
    this.setState({
      proposedDateThree: e.target.value
    });
  }
  /*---on vendor select from dropdown---*/
  onVendorSelect(e) {
    this.setState({
      vendorName: e.target.value
    });
  }
  /*---on event select from dropdown---*/
  onEventSelect(e) {
    this.setState({
      eventName: e.target.value
    });
  }
  /*----save event----*/
  addEvent() {
    var dates = [];
    dates.push(this.state.proposedDateOne);
    dates.push(this.state.proposedDateTwo);
    dates.push(this.state.proposedDateThree);

    this.setState({
      addEvent: true
    });

    var eventDetails = {
      eventName: this.state.eventName,
      location: document.getElementById("streetId").value,
      vendorName: this.state.vendorName,
      proposedDates: dates,
      confirmedDate: null,
      status: STATUS.PENDING,
      hrId: this.state.hrId
    };
    if (
      eventDetails.eventName != "" &&
      eventDetails.location != "" &&
      eventDetails.vendorName != "" &&
      eventDetails.proposedDates.length == 3
    ) {
      fetch("/api/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(eventDetails)
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            console.log(json.message);
          } else {
            console.log(json.message);
          }
        });

      window.location.reload();
    }
  }
  /*---get street name with postal code---*/
  findAddress() {
    const postalcode = document.getElementById("address").value;
    document.getElementById("streetId").value = "Loading....";
    if (postalcode != "") {
      var data = new URLSearchParams();
      data.append("APIKey", APIKey);
      data.append("APISecret", APISecure);
      data.append("Postcode", postalcode);
      fetch(PROXY_URL + LOCATION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
      })
        .then(res => res.json())
        .then(json => {
          if (json.IsSuccess) {
            this.setState(
              {
                streetName: json.Postcodes[0].StreetName
              },
              () => {
                document.getElementById(
                  "streetId"
                ).value = this.state.streetName;
              }
            );
          } else {
            alert(
              "Oops!",
              "Unable to find street name.Please enter a valid street name.",
              "error"
            );
            document.getElementById("streetId").value = "";
          }
        });
    } else {
      alert("Missing!", "Please Enter Postal Code!", "error");
    }
  }
  render() {
    const { postalCode, companyName } = this.state;

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Event Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table>
            <tbody>
              <tr>
                <td>
                  <label for="companyId" style={{ fontFamily: "Arial" }}>
                    Company Name:
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    id="companyId"
                    value={this.state.companyName}
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="eventName" style={{ fontFamily: "Arial" }}>
                    Select Events
                  </label>
                </td>
                <td>
                  <select
                    class="form-control"
                    id="eventId"
                    value={this.state.eventName}
                    onChange={this.onEventSelect}
                  >
                    <option value="">Select</option>
                    {this.state.events.map(event => (
                      <option value={event.eventName}>{event.eventName}</option>
                    ))}
                  </select>
                </td>
                <td>
                  {this.state.addEvent && !this.state.eventName && (
                    <div className="help-block" style={{ color: "red" }}>
                      *Please select an Event
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <label for="proposedDate1" style={{ fontFamily: "Arial" }}>
                    Proposed Date1
                  </label>
                </td>
                <td>
                  <input
                    type="date"
                    class="form-control"
                    id="proposedDateId1"
                    onChange={this.onProposedDateOneSelect}
                  />
                </td>
                <td>
                  {this.state.addEvent && !this.state.proposedDateOne && (
                    <div className="help-block" style={{ color: "red" }}>
                      *Please select Proposed Date 1
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <label for="proposedDate2" style={{ fontFamily: "Arial" }}>
                    Proposed Date2
                  </label>
                </td>
                <td>
                  <input
                    type="date"
                    class="form-control"
                    id="proposedDateId2"
                    onChange={this.onProposedDateTwoSelect}
                    required
                  />
                </td>
                <td>
                  {this.state.addEvent && !this.state.proposedDateTwo && (
                    <div className="help-block" style={{ color: "red" }}>
                      *Please select Proposed Date 2
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <label for="proposedDate3" style={{ fontFamily: "Arial" }}>
                    Proposed Date3
                  </label>
                </td>
                <td>
                  <input
                    type="date"
                    class="form-control"
                    id="proposedDateId3"
                    onChange={this.onProposedDateThreeSelect}
                    required
                  />
                </td>
                <td>
                  {this.state.addEvent && !this.state.proposedDateThree && (
                    <div className="help-block" style={{ color: "red" }}>
                      *Please Propose Date 3
                    </div>
                  )}
                </td>
              </tr>

              <tr>
                <td>
                  <label for="vendorName" style={{ fontFamily: "Arial" }}>
                    Select Vendor
                  </label>
                </td>
                <td>
                  <select
                    class="form-control"
                    id="vendorId"
                    value={this.state.vendorName}
                    onChange={this.onVendorSelect}
                  >
                    <option value="">Select</option>
                    {this.state.vendorNames.map(vendor => (
                      <option value={vendor}>{vendor}</option>
                    ))}
                  </select>
                </td>
                <td>
                  {this.state.addEvent && !this.state.vendorName && (
                    <div className="help-block" style={{ color: "red" }}>
                      *Please select a Vendor
                    </div>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <label for="address" style={{ fontFamily: "Arial" }}>
                    Enter Postalcode of Location
                  </label>
                </td>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            class="form-control"
                            name="address"
                            id="address"
                          />
                        </td>
                        <td>
                          <Button variant="success" onClick={this.findAddress}>
                            Find
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <label style={{ fontFamily: "Arial" }}>Street Name</label>
                </td>
                <td>
                  <textarea
                    style={{ width: "100%" }}
                    id="streetId"
                    class="form-control"
                  ></textarea>
                </td>
                <td>
                  {this.state.addEvent && !this.state.streetName && (
                    <div className="help-block" style={{ color: "red" }}>
                      *Please fill a Location
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={this.addEvent}>
            Add Event
          </Button>
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddEvent;
