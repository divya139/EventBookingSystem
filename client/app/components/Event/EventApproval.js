import React, { Component } from "react";
import { Modal, Button, Row, Col, Form, Popup } from "react-bootstrap";
import { STATUS } from "../../utils/constants";
import { alert } from "../alerts/alerts";
import SweetAlert from "react-bootstrap-sweetalert";

class EventApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      confirmDate: "",
      showButton: false,
      remarks: "",
      showProposedDates: false
    };

    this.onDateChange = this.onDateChange.bind(this);
    this.onApproveEvent = this.onApproveEvent.bind(this);
    this.onRejectEvent = this.onRejectEvent.bind(this);
    this.onRemarksIn = this.onRemarksIn.bind(this);
  }

  componentDidMount() {}
  /*---onchange remarks textbox---*/
  onRemarksIn(e) {
    this.setState({
      remarks: e.target.value
    });
  }
  /* on click button Approve.
  will update status as Approved */
  onApproveEvent() {
    if (this.state.confirmDate != "") {
      fetch("/api/events/updateStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: this.props.viewEvent._id,
          vendorName: this.props.viewEvent.eventDetails.vendorName,
          location: this.props.viewEvent.eventDetails.location,
          proposedDates: this.props.viewEvent.eventDetails.proposedDates,
          confirmedDate: this.state.confirmDate,
          status: STATUS.APPROVED,
          userId: this.props.viewEvent.eventDetails.userId,
          dateCreated: this.props.viewEvent.eventDetails.dateCreated,
          remarks: this.state.remarks
        })
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            alert("Info", json.message, "success");
          } else {
            alert("Failed", json.message, "error");
          }
        });
      window.location.reload();
    } else {
      alert(
        "Missing!",
        "Please choose one of the Proposed Dates to confirm!",
        "warning"
      );
    }
  }
  /* on click button Reject.
  will update status as Rejected */
  onRejectEvent() {
    if (this.state.remarks != "") {
      fetch("/api/events/updateStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          _id: this.props.viewEvent._id,
          vendorName: this.props.viewEvent.eventDetails.vendorName,
          location: this.props.viewEvent.eventDetails.location,
          proposedDates: this.props.viewEvent.eventDetails.proposedDates,
          confirmedDate: this.state.confirmDate,
          status: STATUS.REJECTED,
          userId: this.props.viewEvent.eventDetails.userId,
          dateCreated: this.props.viewEvent.eventDetails.dateCreated,
          remarks: this.state.remarks
        })
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            alert("Info", json.message, "success");
            console.log(json.message);
          } else {
            alert("Info", json.message, "error");
            console.log(json.message);
          }
        });
      window.location.reload();
    } else {
      alert("Missing!", "Please fill Remarks before rejecting", "warning");
    }
  }
  onDateChange(e) {
    this.setState({
      confirmDate: e.target.value
    });
  }

  render() {
    let {
      status = this.props.viewEvent.eventDetails.status,
      showButton,
      showProposedDates
    } = this.state;

    if (status == STATUS.PENDING) {
      showButton = true;
      showProposedDates = true;
    }

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
                  <label for="eventName" style={{ fontFamily: "Arial" }}>
                    Event Name
                  </label>
                </td>
                <td>
                  <label class="form-control" id="eventId">
                    {this.props.viewEvent.eventName}
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="vendorName" style={{ fontFamily: "Arial" }}>
                    Vendor Name
                  </label>
                </td>
                <td>
                  <label class="form-control" id="vendorId">
                    {this.props.viewEvent.eventDetails.vendorName}
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="confirmedDate" style={{ fontFamily: "Arial" }}>
                    Confirmed Date
                  </label>
                </td>
                <td>
                  <label class="form-control" id="confirmDaterId">
                    {this.props.viewEvent.eventDetails.confirmedDate}
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="vendorName" style={{ fontFamily: "Arial" }}>
                    Location
                  </label>
                </td>
                <td>
                  <label class="form-control" id="vendorId">
                    {this.props.viewEvent.eventDetails.location}
                  </label>
                </td>
              </tr>
              {showProposedDates ? (
                <tr>
                  <td>
                    <label for="propsedDates" style={{ fontFamily: "Arial" }}>
                      Proposed Dates
                    </label>
                  </td>
                  <td>
                    <select
                      class="form-control"
                      id="exampleSelect1"
                      value={this.state.confirmDate}
                      onChange={this.onDateChange}
                    >
                      <option value="">Select</option>
                      {this.props.viewEvent.eventDetails.proposedDates.map(
                        date => (
                          <option value={date}>{date}</option>
                        )
                      )}
                    </select>
                  </td>
                </tr>
              ) : null}
              <tr>
                <td>
                  <label for="dateCreated" style={{ fontFamily: "Arial" }}>
                    Date Created
                  </label>
                </td>
                <td>
                  <label class="form-control" id="dateCreated">
                    {this.props.viewEvent.eventDetails.dateCreated}
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="status" style={{ fontFamily: "Arial" }}>
                    Status
                  </label>
                </td>
                <td>
                  <label class="form-control" id="status">
                    {this.props.viewEvent.eventDetails.status}
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="remarksId" style={{ fontFamily: "Arial" }}>
                    Remarks
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    id="remarksId"
                    value={this.props.viewEvent.eventDetails.remarks}
                    onChange={this.onRemarksIn}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          {showButton ? (
            <div>
              <Button
                variant="success"
                id="approveId"
                onClick={this.onApproveEvent}
              >
                Approve
              </Button>
              &nbsp;&nbsp;
              <Button variant="info" onClick={this.onRejectEvent}>
                Reject
              </Button>
            </div>
          ) : null}
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EventApproval;
