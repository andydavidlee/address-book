// register component

// imports
import React, { useState } from 'react';
import { Row, Col, Form, Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirestore} from 'react-redux-firebase';

const Register = ({firebase}) => {
  const [ registrationData, setRegistrationData ] = useState ({
    email: '',
    password: ''
  });
  
  const { email, password } = registrationData;

  const history = useHistory();
  
  const onChange = e => setRegistrationData({
    ...registrationData, [e.target.name]: e.target.value
  });
  
  const onSubmit = e => {
    e.preventDefault();


   // add new client to the database
firebase.auth().createUserWithEmailAndPassword(email, password)
.then(() => alert('Contact Details added!'),
// redirect the user to the home page
history.push('/'));
  }
  
  return (
    <Row>
      <Col md={6} className='mx-auto'>
        <Card className="grey">
          <Card.Body>
            <h1 className='title text-center pb-4, pt-3'>
             REGISTEr
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

export default enhance(Register);