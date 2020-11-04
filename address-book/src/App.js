import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

// Custom Components
import Dashboard from './components/layout/Dashboard';
import Details from './components/details/Details';
import AddDetails from './components/details/AddDetails';
import EditDetails from './components/details/EditDetails';

const App = () => {
  // Creating the fontawesome library
  library.add(faTimes, faEdit, faPlus);
  return (
    <Router>
      <Container>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/detail/add' component={AddDetails} />
          <Route exact path='/detail/:id' component={Details} />
          <Route exact path='/detail/edit/:id' component={EditDetails} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
