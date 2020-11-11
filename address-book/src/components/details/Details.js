import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

// Import redux functions
import { compose } from 'redux';
import { withFirestore, useFirestoreConnect, useFirestore } from "react-redux-firebase";
import { connect } from 'react-redux';

// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Details = ({ details }) => {

    // database listener pass in the collection we are listening to.
    // const firestore = useFirestore();
    useFirestoreConnect('details');
    // const history = useHistory();
    // const id = props.match.params.id; // I think it will work if I can somehow point this to the id on the tables row.

    const onDeleteClick = (e) => {
        console.log('Ooooops delete');
    //     // delete the client from the database
    //     firestore.collection('details').doc(id).delete()
    //     .then(() => console.log("Contact details deleted"));
    //     // // redirect to the dashboard
    //     history.push('/');
    }

  

    // if (details) {
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
                         <Button onClick={e => onDeleteClick(e)}><FontAwesomeIcon icon='times' /></Button>
                         </td>
                         </tr>
                       ))}
                   </tbody>
               </Table>
            </Fragment>
         )     
    // } else {
    //     console.log ('not connected');
    // }
        
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
