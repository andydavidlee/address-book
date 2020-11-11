import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
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
                           <th><Link to='detail/add'><FontAwesomeIcon icon='plus' size='lg' /></Link></th>          
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
                         <Button><Link to={`/detail/edit/${detail.id}`}><FontAwesomeIcon icon='edit' /></Link></Button> {'   '}
                         <Button onClick={e => onDeleteClick(e, detail.id)}><FontAwesomeIcon icon='times' /></Button>
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
