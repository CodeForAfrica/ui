import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';

import NotFound from './pages/404';
import Home from './pages/Home';
import PromisePage from './pages/Promise';
import Promises from './pages/Promises';
import Articles from './pages/Articles';
import About from './pages/About';
import Article from './pages/Article';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/promises" component={Promises} />
          <Route exact path="/promises/:slug" component={PromisePage} />
          <Route exact path="/articles" component={Articles} />
          <Route exact path="/articles/:slug" component={Article} />
          <Route exact path="/about" component={About} />
          <Route component={NotFound} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
