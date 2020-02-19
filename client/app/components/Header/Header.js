import React from "react";

import { Link } from "react-router-dom";

const Header = () => (
  <header>
    <nav class="navbar navbar-expand-lg navbar-primary bg-primary">
      <ul class="navbar-nav mr-auto">
        <li>
          <img
            src="/assets/img/mhcImg.png"
            style={{ position: "relative", left: "30px" }}
            alt="Img"
            height="42"
            width="42"
          />
        </li>
        <li class="nav-item">
          <h4 style={{ position: "relative", color: "white", left: "50px" }}>
            Event Booking System
          </h4>
        </li>
        {/*<nav class="nav-item">
      <Link to="/helloworld" class="nav-link"><b style={{color:"black"}}>Hello World</b></Link>
    </nav> */}
      </ul>
    </nav>

    <hr />
  </header>
);

export default Header;
