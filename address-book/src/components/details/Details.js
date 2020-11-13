import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Import redux functions
import { compose } from 'redux';
import { withFirestore, useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { connect } from 'react-redux';

// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// spinning component
import Spinner from '../layout/Spinner';
// Chevron Component
import Chevron from '../layout/Chevron';


const Details = ({ details }) => {

    // database listener pass in the collection we are listening to.
    const firestore = useFirestore();
    useFirestoreConnect('details');

    // To delete a document from the database by its id
    const onDeleteClick = (e, id) => {
    // delete the detail from the database
        firestore.collection('details').doc(id).delete()
        .then(() => alert("Contact details deleted"));
    }

    if (details) {
        return (
            <Fragment>
                <Row>
                    <Col sm={6}>
                        <div className='chevrondisplayone'>
                        <Chevron />
                        </div>
                   
                    </Col>
                    <Col sm={6}>
                    <Chevron className='chevrondisplaytwo'/>
                    </Col>
                </Row>
                <div className='text-center text-white'>
                    <h1 className='title'>CONTACTs</h1>
                </div>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId='search' className='form-inline'>
                            <Form.Label className= 'text-white mr-3'>Search: </Form.Label>
                                <Form.Control
                                    className='inputcolour'
                                    size= '1'
                                    type= 'text'
                                    name= 'search'
                                    />
                        </Form.Group>   
                    </Col>
                </Row>
               <Table striped className='text-white grey rounded'>
                   <thead className='thead-inverse'>
                       <tr>
                           <th>Last Name</th>
                           <th>First Name</th>
                           <th>Phone</th>
                           <th>Email</th>
                           <th>Address</th>
                           <th><Link to='detail/add'><FontAwesomeIcon className='text-white' icon='plus' size='lg' /></Link></th>          
                       </tr>
                   </thead>
                   <tbody>
                       { details.map(detail => (
                           <tr key={detail.id}>
                         <td>{detail.lastName}</td>
                         <td>{detail.firstName}</td>
                         <td>{detail.phone}</td>
                         <td>{detail.email}</td>
                         <td>{detail.address}</td>
                         <td>
                         <Link to={`/detail/edit/${detail.id}`}><FontAwesomeIcon className='text-white' icon='edit' /></Link>{'   '}
                         <Link onClick={e => onDeleteClick(e, detail.id)}><FontAwesomeIcon icon='times' className='text-white' /></Link>
                         </td>
                         </tr>
                       ))}
                   </tbody>
               </Table>
            </Fragment>
         )     
    } else {
       return <Spinner />;
    }
        
}

Details.propTypes = {
firestore: PropTypes.object.isRequired,
details: PropTypes.array,
}

const enhance = compose(
    withFirestore,
    connect((state) => ({
        details: state.firestore.ordered.details    
    }))
);

export default enhance(Details);
