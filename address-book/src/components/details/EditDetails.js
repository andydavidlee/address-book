// edit component

import React, { Fragment, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {withFirestore, useFirestoreConnect, useFirestore } from 'react-redux-firebase';

const EditDetails = (props) => {

// sets the initial state
const [contactDetails, setContactDetails] = useState({
    lastName: '', 
    firstName: '', 
    phone: '', 
    email: '', 
    address: ''
});


const { lastName, firstName, phone, email, address} = contactDetails;
const id = props.match.params.id;
const firestore = useFirestore();
const history = useHistory();


// access database and pulls the record by its id
useFirestoreConnect(props => [
    { collection: 'details', doc: id}
], connect((state, props) => ({
    details: state.firestore.data.details
}))
)

const {details} = props;

useEffect(() => {
    // checking for there are contact details
    if (details) {
        // pulling out the wanted details
        const detail = details[0];
        setContactDetails({
            lastName: detail.lastName, 
            firstName: detail.firstName, 
            phone: detail.phone, 
            email: detail.email, 
            address: detail.address
        })
    }
}, [details])

const onSubmit = e => {
    e.preventDefault();
    console.log('Submit - edit detail');

     // update our client in the database. 
 firestore.collection('details').doc(id).update(contactDetails)
 .then(() => console.log('Details  updated'));

history.push('/');
}




const onChange = e => setContactDetails({
    ...contactDetails, [e.target.name]: e.target.value
})

    return (
        <Fragment>
        <Row>
            <Col md={8} className="mx-auto">
            <Card className="grey">
          <Card.Body>
        <h2 className="text-center title">EDIT CONTACTs</h2>
       
    <Form onSubmit= {e => onSubmit(e)}>
        <Form.Group controlId='lastName'>
            <Form.Label className="text-white">Last Name: </Form.Label>
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
        <Form.Label className="text-white">First Name: </Form.Label>
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
        <Form.Label className="text-white">Phone: </Form.Label>
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
        <Form.Label className="text-white">Email: </Form.Label>
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
        <Form.Label className="text-white">Address: </Form.Label>
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
    withFirestore,
    connect((state) => ({
        details: state.firestore.ordered.details
    }))
);

export default enhance(EditDetails);
