import React from 'react';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/404';
import Home from './pages/Home';
import Promises from './pages/Promises';
import Articles from './pages/Articles';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/promises" component={Promises} />
          <Route exact path="/articles" component={Articles} />
          <Route component={NotFound} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
