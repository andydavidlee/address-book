// login component

// imports
import React, { useState } from 'react';
import { Row, Col, Form, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirestore} from 'react-redux-firebase';


const Login = ({ firebase }) => {
  const [ loginData, setLoginData ] = useState ({
    email: '',
    password: ''
  });
  
  const { email, password } = loginData;
  const history = useHistory();
  
  const onChange = e => setLoginData({
    ...loginData, [e.target.name]: e.target.value
  });
  
  const onSubmit = e => {
    e.preventDefault();
    // authenticating with firebase - using email and password
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( res => {
        // compares email and password on database, if correct loads the home page
        if (res.user );
        history.push('/');
      })
      // if email and password incorrect, alerts the user
      .catch( e => {
        alert(e.message);
      })
  }
  
  // Browser
  
  return (
    <Row>
      <Col md={6} className='mx-auto'>
        <Card className="grey">
          <Card.Body>
            <h1 className='title text-center pb-4, pt-3'>
             LOGIn
            </h1>
            <Form onSubmit={e => onSubmit(e)}>
              <Form.Group controlId="email">
                <Form.Label className='text-white'>Email</Form.Label>
                <Form.Control 
                    className="inputcolour"
                  type="email" 
                  placeholder="Enter your email" 
                  name="email"
                  value={email}
                  onChange={e => onChange(e)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className='text-white'>password</Form.Label>
                <Form.Control 
                className="inputcolour"
                  type="password" 
                  placeholder="Enter your password" 
                  name="password"
                  value={password}
                  onChange={e => onChange(e)}
                />
              </Form.Group>
              <Button type='submit' variant="dark" className="btn-block">Login</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

const enhance = compose(
  withFirestore,
  connect((state) => ({
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }))
)

export default enhance(Login);