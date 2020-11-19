import React, { Fragment } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';


const AppNavBar = ({ firebase, auth }) => {
  
  const history = useHistory();
  
  const logOut = e => {
    console.log('logout!!!');
    // log out from the database
    firebase.auth().signOut().then(() => {
      console.log('Signed out...');
      history.push('/login');
    })
      .catch((error) => {console.log('error: ', error); });
  }
  
  const loggedIn = (
    <Fragment>
      <Nav.Link href="/">Dashboard</Nav.Link>
      <Nav.Link href="/#!">{auth.email}</Nav.Link>
      <Nav.Link href="/#!" onClick={e => logOut(e)}>Logout</Nav.Link>
    </Fragment>
  );
  
  const loggedOut = (
    <Fragment>
        <Nav.Link href="/login">Login</Nav.Link>
        <Nav.Link href="/Register">Register</Nav.Link>
    </Fragment>
  
  )
  
  return (
    <Navbar expand='md' variant='dark' className='mb-4'>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { auth.uid !== undefined ? loggedIn : loggedOut }  
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const enhance = compose (
  withFirestore,
  connect((state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }))
);

export default enhance(AppNavBar);