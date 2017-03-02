import React from 'react';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import Base from './containers/Base';
import DealListPage from './containers/DealListPage';
import DealPage from './containers/DealPage';

const DealsApp = () => (
  <Router history={browserHistory}>
    <Route path="/deals/" component={Base}>
      <IndexRoute component={DealListPage}/>
      <Route path="/deals/:dealId" component={DealPage}/>
    </Route>
  </Router>
);

export default DealsApp;
