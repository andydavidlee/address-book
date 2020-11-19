// Details component

import React, { Fragment, useState, useEffect } from 'react';
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


const Details = ({ details }) => {

    const [ search, setSearch, ] = useState('');
    // const [ filteredDetails, setFilteredDetails]= useState([]);


    // database listener pass in the collection we are listening to.
    const firestore = useFirestore();
    useFirestoreConnect('details');

    // To delete a document from the database by its id
    const onDeleteClick = (e, id) => {
    // delete the detail from the database
        firestore.collection('details').doc(id).delete()
        .then(() => alert("Contact details deleted"));
    }

    // useEffect(() => {
    //     setFilteredDetails(
    //         details.filter( (detail) => {
    //             return detail.lastName.toLowerCase().includes( search.toLowerCase())
    //         })
    //     )
    // }, [search, details])

    if (details) {
        return (
            <Fragment>
              <div className='pagetitle'>
              <Row>
                    <Col>
                    <h1 className='title'>CONTACTs</h1>
                    </Col>
                </Row>
              </div>
               
                <Form className='text-white'>
                    <input type="text" placeholder="Search..." value={search} onChange={ e => setSearch(e.target.value)} />
                </Form>
                <div style={{zindex:100}}>
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
                </div>
             
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
