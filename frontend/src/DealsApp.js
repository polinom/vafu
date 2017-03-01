import React from 'react';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import Base from './containers/Base/index';
import DealListPage from './containers/DealListPage/index';
import DealPage from './containers/DealPage/index';

const DealsApp = () => (
  <Router history={browserHistory}>
    <Route path="/deals/" component={Base}>
      <IndexRoute component={DealListPage}/>
      <Route path="/deals/:dealId" component={DealPage}/>
    </Route>
  </Router>
);

export default DealsApp;
