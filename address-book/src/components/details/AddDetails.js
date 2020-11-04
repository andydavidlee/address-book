import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Row, Form, Col, Button } from 'react-bootstrap';

const AddDetails = () => {

const [details, setDetails ] = useState ({
    lastName: '', 
    firstName: '', 
    phone: '', 
    email: '', 
    address: ''
});

const { lastName, firstName, phone, email, address} = setDetails;

const onChange = e => setDetails({
    ...details, [e.target.name]: e.target.value
});

const onSubmit = e => {
    e.preventDefault();
    console.log('Submit Clicked!');
    console.log(details);
}

    return (
        <Fragment>
            <Row>
                <h2>NEW CONTACTs</h2>
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

export default AddDetails
