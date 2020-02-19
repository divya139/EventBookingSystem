import React from 'react';
import {Navbar} from 'react-bootstrap';

function Footer() {
  return (
    <Navbar bg="primary" expand="lg" fixed="bottom">
      <div className={'text-center'} style={{ width: '100vw', fontSize: 15,color:"white" }}>
        copyright
        &copy;{new Date().getFullYear()} All Rights Reserved. MHC Asia Group 
      </div>
    </Navbar>
  );
}

export default Footer;
