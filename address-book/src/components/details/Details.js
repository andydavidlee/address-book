import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Details = props => {

    const details = [
       { id: '1', lastName: 'Lee', firstName: 'Andrew', phone: '0423807286', email: 'andrewd_lee@outlook.com', address: '6/60 Strettle Street, Northcote VIC 3070'},
       { id: '2', lastName: 'King', firstName: 'Andrew', phone: '0423807286', email: 'andrewd_lee@outlook.com', address: '6/60 Strettle Street, Northcote VIC 3070'},
       { id: '3', lastName: 'Severus', firstName: 'Andrew', phone: '0423807286', email: 'andrewd_lee@outlook.com', address: '6/60 Strettle Street, Northcote VIC 3070'}
    ]

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
