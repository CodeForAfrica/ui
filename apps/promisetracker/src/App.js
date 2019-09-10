import React from 'react';

import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/404';
import Home from './pages/Home';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ScrollToTop>
        <Switch>
          <Route
            exact
            strict
            path="/:url*"
            // eslint-disable-next-line react/prop-types
            render={props => <Redirect to={`${props.location.pathname}/`} />}
          />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
