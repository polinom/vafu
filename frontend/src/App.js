import React from 'react';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import Base from './containers/Base';
import GoalListPage from './containers/GoalListPage';
import UserProfilePage from './containers/UserProfilePage';

const App = () => (
  <Router history={browserHistory}>
    <Route path="/goals/" component={Base}>
      <IndexRoute component={GoalListPage}/>
      <Route path="/users/:username" component={UserProfilePage}/>
    </Route>
  </Router>
);

export default App;
