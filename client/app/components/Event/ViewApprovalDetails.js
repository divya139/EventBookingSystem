import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

class ViewApprovalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      confirmDate: "",
      showButton: true,
      remarks: ""
    };
  }

  componentDidMount() {}

  render() {
    let {
      status = this.props.viewEvent.eventDetails.status,
      showButton
    } = this.state;

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
                  <label for="propsedDates" style={{ fontFamily: "Arial" }}>
                    Proposed Dates
                  </label>
                </td>
                <td>
                  {this.props.viewEvent.eventDetails.proposedDates.map(date => (
                    <li>
                      <label value={date}>{date}</label>
                    </li>
                  ))}
                </td>
              </tr>
              <tr>
                <td>
                  <label for="confirmDate" style={{ fontFamily: "Arial" }}>
                    Confirmed Date
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    id="confirmId"
                    value={this.props.viewEvent.eventDetails.confirmedDate}
                    disabled
                  />
                </td>
              </tr>
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
                  <label
                    class="form-control"
                    id="remarksId"
                    value={this.props.viewEvent.eventDetails.remarks}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default ViewApprovalDetails;
