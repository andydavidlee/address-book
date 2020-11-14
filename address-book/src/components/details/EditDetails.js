import React, { Fragment, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Row } from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {withFirestore, useFirestoreConnect, useFirestore } from 'react-redux-firebase';

const EditDetails = (props) => {

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
        <h2>EDIT CONTACTs</h2>
    </Row>
    <Form onSubmit= {e => onSubmit(e)}>
        <Form.Group controlId='lastName'>
            <Form.Label>Last Name: </Form.Label>
            <Form.Control
                type= 'text'
                name= 'lastName'
                value= {lastName}
                minLength='2'
                onChange={e => onChange(e)}
                />
        </Form.Group>
        <Form.Group controlId='firstName'>
        <Form.Label>First Name: </Form.Label>
            <Form.Control
                type= 'text'
                name= 'firstName'
                value= {firstName}
                minLength='2'
                onChange={e => onChange(e)}
                />
        </Form.Group>
        <Form.Group controlId='phone'>
        <Form.Label>Phone: </Form.Label>
            <Form.Control
                type= 'text'
                name= 'phone'
                value= {phone}
                minLength='8'
                onChange={e => onChange(e)}
                />
        </Form.Group>
        <Form.Group controlId='email'>
        <Form.Label>Email: </Form.Label>
            <Form.Control
                type= 'email'
                name= 'email'
                value= {email}
                minLength='2'
                onChange={e => onChange(e)}
                />
        </Form.Group>
        <Form.Group controlId='address'>
        <Form.Label>Address: </Form.Label>
            <Form.Control
                type= 'text'
                name= 'address'
                value= {address}
                minLength='2'
                onChange={e => onChange(e)}
                />
        </Form.Group>
        <Button type='submit'>Submit</Button>
    </Form>
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
