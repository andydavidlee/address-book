// 

import React, { useState, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import { Row, Form, Button, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { withFirestore, useFirestoreConnect, useFirestore} from 'react-redux-firebase';

const AddDetails = (props, { details }) => {

const [contactDetails, setContactDetails ] = useState ({
    lastName: '', 
    firstName: '', 
    phone: '', 
    email: '', 
    address: ''
});

const { lastName, firstName, phone, email, address} = contactDetails;

// add in database config and listeners
const firestore = useFirestore();
useFirestoreConnect('details');
const history = useHistory();

const onChange = e => setContactDetails({
    ...contactDetails, [e.target.name]: e.target.value
});

const onSubmit = e => {
    e.preventDefault();
    // console.log('Submit Clicked!');
    // console.log(contactDetails);
    const newDetail = contactDetails;


// add new client to the database
firestore.collection('details').add(newDetail)
    .then(() => console.log('Contact Details added!'));
    // redirect the user to the home page
    history.push('/');

}

    return (
        <Fragment>
            <Row>
                <Col md={8} className="mx-auto">
                <Card className="grey">
          <Card.Body>
                <h2 className="text-center title">NEW CONTACTs</h2>
         
            <Form onSubmit= {e => onSubmit(e)}>
                <Form.Group controlId='lastName'>
                    <Form.Label className='text-white'>Last Name: </Form.Label>
                    <Form.Control
                    className="inputcolour"
                        type= 'text'
                        name= 'lastName'
                        value= {lastName}
                        minLength='2'
                        onChange={e => onChange(e)}
                        />
                </Form.Group>
                <Form.Group controlId='firstName'>
                <Form.Label className='text-white'>First Name: </Form.Label>
                    <Form.Control
                    className="inputcolour"
                        type= 'text'
                        name= 'firstName'
                        value= {firstName}
                        minLength='2'
                        onChange={e => onChange(e)}
                        />
                </Form.Group>
                <Form.Group controlId='phone'>
                <Form.Label className='text-white'>Phone: </Form.Label>
                    <Form.Control
                    className="inputcolour"
                        type= 'text'
                        name= 'phone'
                        value= {phone}
                        minLength='8'
                        onChange={e => onChange(e)}
                        />
                </Form.Group>
                <Form.Group controlId='email'>
                <Form.Label className='text-white'>Email: </Form.Label>
                    <Form.Control
                    className="inputcolour"
                        type= 'email'
                        name= 'email'
                        value= {email}
                        minLength='2'
                        onChange={e => onChange(e)}
                        />
                </Form.Group>
                <Form.Group controlId='address'>
                <Form.Label className='text-white'>Address: </Form.Label>
                    <Form.Control
                    className="inputcolour"
                        type= 'text'
                        name= 'address'
                        value= {address}
                        minLength='2'
                        onChange={e => onChange(e)}
                        />
                </Form.Group>
                <Row>
                    <Col md={2} className="mx-auto">
                    <Button className="center" type='submit'>Submit</Button>
                    </Col>
                </Row>
                
            </Form>
            </Card.Body>
            </Card>
            </Col>
            </Row>
        </Fragment>
    )
}

const enhance = compose(
    withFirestore
);

export default enhance(AddDetails);
