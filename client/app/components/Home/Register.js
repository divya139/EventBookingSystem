import React from "react";
import { Link } from "react-router-dom";
import { alert } from "../alerts/alerts";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "vendor_admin",
        company: ""
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*-- on input change. binds the value to state --*/
  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  /*-- on click Register button. Save the details to backend--*/
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.firstName && user.lastName && user.email && user.password) {
      fetch("/api/account/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            alert("Registered Successfully!", "", "success");
          } else {
            alert("Registration Failed!", json.message, "error");
          }
        });
    }
  }

  render() {
    const { user, submitted } = this.state;
    // return(
    //   <div>Hello welcome</div>
    // );

    return (
      <div>
        <h2 align="center" style={{ color: "DodgerBlue" }}>
          Vendor Registration Form
        </h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <table align="center">
            <tbody>
              <tr>
                <div
                  className={
                    "form-group" +
                    (submitted && !user.firstName ? " has-error" : "")
                  }
                >
                  <td>
                    <label htmlFor="firstName">First Name</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={user.firstName}
                      onChange={this.handleChange}
                    />
                    {submitted && !user.firstName && (
                      <div className="help-block">First Name is required</div>
                    )}
                  </td>
                </div>
              </tr>
              <tr>
                <div
                  className={
                    "form-group" +
                    (submitted && !user.lastName ? " has-error" : "")
                  }
                >
                  <td>
                    <label htmlFor="lastName">Last Name</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={user.lastName}
                      onChange={this.handleChange}
                    />
                    {submitted && !user.lastName && (
                      <div className="help-block">Last Name is required</div>
                    )}
                  </td>
                </div>
              </tr>
              <tr>
                <div
                  className={
                    "form-group" +
                    (submitted && !user.email ? " has-error" : "")
                  }
                >
                  <td>
                    <label htmlFor="email">Username</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={user.email}
                      onChange={this.handleChange}
                    />
                    {submitted && !user.email && (
                      <div className="help-block">Username is required</div>
                    )}
                  </td>
                </div>
              </tr>
              <tr>
                <div
                  className={
                    "form-group" +
                    (submitted && !user.password ? " has-error" : "")
                  }
                >
                  <td>
                    <label htmlFor="password">Password</label>
                  </td>
                  <td>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={user.password}
                      onChange={this.handleChange}
                    />
                    {submitted && !user.password && (
                      <div className="help-block">Password is required</div>
                    )}
                  </td>
                </div>
              </tr>
              <tr>
                <div
                  className={
                    "form-group" +
                    (submitted && !user.password ? " has-error" : "")
                  }
                ></div>
              </tr>
              <tr>
                <div
                  className={
                    "form-group" +
                    (submitted && !user.password ? " has-error" : "")
                  }
                >
                  <td>
                    <label htmlFor="company">company</label>
                  </td>
                  <td>
                    <input
                      type="company"
                      className="form-control"
                      name="company"
                      value={user.company}
                      onChange={this.handleChange}
                    />
                    {submitted && !user.company && (
                      <div className="help-block">Company is required</div>
                    )}
                  </td>
                </div>
              </tr>
              <tr>
                <td>
                  <button className="btn btn-primary">Register</button>
                  &nbsp;&nbsp;
                  <Link to="/" className="btn btn-primary">
                    Cancel/Back
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}
export default Register;
