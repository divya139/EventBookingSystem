import React, { Component } from "react";
import EventDetails from "../Event/EventDetails";
import { getFromStorage, setInKey } from "../../utils/storage";
import { alert } from "../alerts/alerts";
import { Link } from "react-router-dom";
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      registerError: "",
      loginError: "",
      loginEmail: "",
      loginPassword: "",
      userData: ""
    };

    this.onTextBoxChangeLoginEmail = this.onTextBoxChangeLoginEmail.bind(this);
    this.onTextBoxChangeLoginPassword = this.onTextBoxChangeLoginPassword.bind(
      this
    );
    this.onLogIn = this.onLogIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  //on load verifiees whether token is present. If not loads login page
  componentDidMount() {
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      //verify token
      const { token } = obj;
      fetch("/api/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }
  //triggers when email textbox changes
  onTextBoxChangeLoginEmail(event) {
    this.setState({
      loginEmail: event.target.value
    });
  }
  //triggers when password textbox changes
  onTextBoxChangeLoginPassword(event) {
    this.setState({
      loginPassword: event.target.value
    });
  }
  //log out function. Clears token
  logOut() {
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      //verify token
      const { token } = obj;
      fetch("/api/account/logout?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }
  //login function. verifies valid login
  onLogIn() {
    const { loginEmail, loginPassword, userData } = this.state;

    fetch("/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          console.log(json.message);
          setInKey("the_main_app", { token: json.token });
          setInKey("the_user_details", { userData: json.data });
          this.setState({
            loginError: json.message,
            loginPassword: "",
            loginEmail: "",
            token: json.token,
            isLoading: false,
            userData: json.data
          });
        } else {
          alert("Login Failed!", json.message, "error");
          this.setState({
            loginError: json.message,
            isLoading: false
          });
        }
      });
  }
  render() {
    const {
      isLoading,
      token,
      loginError,
      loginEmail,
      loginPassword
    } = this.state;
    const obj = getFromStorage("the_user_details");
    console.log("userDetais" + obj.userData.role);
    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    if (!token) {
      return (
        <div align="center" style={{ textalign: "left" }}>
          <div
            class="jumbotron"
            style={{ width: "50%", backgroundColor: "DodgerBlue" }}
          >
            <p align="center">
              <img
                src="/assets/img/user.png"
                style={{ position: "relative" }}
                alt="Img"
                height="80"
                width="80"
              />
            </p>
            <div class="form-group" align="left">
              <label
                for="email"
                style={{ fontFamily: "Arial", color: "white" }}
              >
                Email address/User name
              </label>
              <input
                type="email"
                class="form-control"
                id="emailId"
                placeholder="Enter email"
                value={loginEmail}
                onChange={this.onTextBoxChangeLoginEmail}
              />
            </div>
            <div class="form-group" align="left">
              <label
                for="password"
                style={{ fontFamily: "Arial", color: "white" }}
              >
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="passwordId"
                placeholder="Password"
                value={loginPassword}
                onChange={this.onTextBoxChangeLoginPassword}
              />
            </div>
            <div>{this.loginError}</div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <div>
                      <button
                        type="button"
                        class="btn btn-light"
                        onClick={this.onLogIn}
                      >
                        Login
                      </button>
                    </div>
                  </td>
                  <td>&nbsp;&nbsp;&nbsp;</td>
                  <td>
                    <div>
                      <Link to="/register" className="btn btn-light">
                        Register Vendor
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div>
        <button
          style={{
            position: "absolute",
            top: "1",
            right: "0",
            color: "black",
            fontFamily: "Arial"
          }}
          align="right"
          class="btn btn-warning"
          onClick={this.logOut}
        >
          Logout
        </button>

        <EventDetails userId={this.state.token} user={obj.userData} />
      </div>
    );
  }
}

export default Home;
