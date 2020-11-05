import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
// Import redux functions
import { compose } from 'redux';
import { withFirestore, useFirestoreConnect } from "react-redux-firebase";
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Details = props => {

    // database listener pass in the collection we are listening to.

    useFirestoreConnect('details');

    return (
       <Fragment>
           <div className='text-center'>
               <h1>CONTACTs</h1>
           </div>
          <Table striped>
              <thead className='thead-inverse'>
                  <tr>
                      <th>Last Name</th>
                      <th>First Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th><FontAwesomeIcon icon='plus' size='lg' /></th>          
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
                    <FontAwesomeIcon icon='edit' /> {'   '}
                    <FontAwesomeIcon icon='times' />
                    </td>
                    </tr>
                  ))}
              </tbody>
          </Table>
       </Fragment>
    )
}

Details.propTypes = {
details: PropTypes.array,
}

export default Details
