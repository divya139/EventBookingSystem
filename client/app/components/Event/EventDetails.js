import React, { Component } from "react";
import EventApproval from "./EventApproval";
import { Button, ButtonToolBar, Row, Table } from "react-bootstrap";
import { getFromStorage, setInKey } from "../../utils/storage";
import ViewApprovalDetails from "./ViewApprovalDetails";
import AddEvent from "./AddEvent";
class EventDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      modalShow: false,
      isButtonClick: false,
      requiredItem: 0,
      showAddEvent: false,
      isAddEventClick: false,
      isRoleHr: false
    };
    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.onAddEventClick = this.onAddEventClick.bind(this);
  }

  componentDidMount() {
    const vendor = this.props.user.company;
    const role = this.props.user.role;
    if (role == "vendor_admin") {
      fetch("/api/events/getVendorEvents?vendor=" + vendor)
        .then(res => res.json())
        .then(data => {
          this.setState({ events: data.data });
        })
        .catch(console.log);
      this.setState({
        isRoleHr: false
      });
    } else if (role == "hr_admin") {
      const id = this.props.user._id;
      fetch("/api/events/getDetails?hrId=" + id)
        .then(res => res.json())
        .then(data => {
          this.setState({ events: data.data });
        })
        .catch(console.log);
      this.setState({
        isRoleHr: true
      });
    }
  }
  /*--- on add event button click.
   calls API to POST the new event details---*/
  onAddEventClick() {
    this.setState({
      isAddEventClick: true,
      showAddEvent: true
    });
  }
  /* to get the item index from table */
  replaceModalItem(index) {
    this.setState({
      requiredItem: index,
      modalShow: true
    });
  }
  render() {
    const userObj = getFromStorage("the_user_details");
    var userName = userObj.userData.firstName;
    var role = userObj.userData.role;
    let modalShowClose = () => {
      this.setState({
        modalShow: false,
        showAddEvent: false
      });
    };
    const requiredItem = this.state.requiredItem;
    return (
      <div>
        <p>
          <h3 style={{ color: "DodgerBlue" }}>Welcome {userName}!</h3>
        </p>
        <p>
          {this.state.isRoleHr ? (
            <Button
              variant="primary"
              id="addEventId"
              style={{
                position: "relative",
                top: "1",
                left: "0",
                color: "white",
                fontFamily: "Arial"
              }}
              align="left"
              onClick={this.onAddEventClick}
            >
              Add Event
            </Button>
          ) : null}
          {this.state.isAddEventClick ? (
            <AddEvent
              show={this.state.showAddEvent}
              onHide={modalShowClose}
              update={this.componentDidMount}
            />
          ) : null}
        </p>
        <table class="table table-hover">
          <thead>
            <tr className="table-primary">
              <th scope="col">Event Name</th>
              <th scope="col">Vendor Name</th>
              <th scope="col">Location</th>
              <th scope="col">Proposed Dates</th>
              <th scope="col">Confirmed Date</th>
              <th scope="col">Date Created</th>
              <th scope="col">Status</th>
              <th scope="col">Remarks</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.events.map((event, index) => (
              <tr key={index}>
                <td>{event.eventName}</td>
                <td>{event.eventDetails.vendorName}</td>
                <td>{event.eventDetails.location}</td>

                <td>
                  {event.eventDetails.proposedDates.map(date => (
                    <li>{date}</li>
                  ))}
                </td>
                <td>{event.eventDetails.confirmedDate}</td>
                <td>{event.eventDetails.dateCreated}</td>
                <td>{event.eventDetails.status}</td>
                <td>{event.eventDetails.remarks}</td>
                <td>
                  {" "}
                  <button
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => this.replaceModalItem(index)}
                  >
                    View
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {this.state.modalShow && role == "vendor_admin" ? (
          <EventApproval
            show={this.state.modalShow}
            onHide={modalShowClose}
            viewEvent={this.state.events[requiredItem]}
            close={this.state.buttonClick}
          />
        ) : null}
        {this.state.modalShow && role == "hr_admin" ? (
          <ViewApprovalDetails
            show={this.state.modalShow}
            onHide={modalShowClose}
            viewEvent={this.state.events[requiredItem]}
            close={this.state.buttonClick}
          />
        ) : null}
      </div>
    );
  }
}

export default EventDetails;
