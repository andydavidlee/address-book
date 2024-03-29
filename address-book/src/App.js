import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// redux imports
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import store from './store';
import rrfProps from './components/config/rrfProps';

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import AppNavBar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import Details from './components/details/Details';
import AddDetails from './components/details/AddDetails';
import EditDetails from './components/details/EditDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => {

  // Creating the fontawesome library
  library.add(faTimes, faEdit, faPlus);
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
    <Router>
    <AppNavBar />
      <Container>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/detail/add' component={AddDetails} />
          <Route exact path='/detail/:id' component={Details} />
          <Route exact path='/detail/edit/:id' component={EditDetails} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/Register' component={Register} />
        </Switch>
      </Container>
    </Router>
    </ReactReduxFirebaseProvider>
    </Provider>
 
  );
}

export default App;
