import React from 'react';
import ReactDOM from 'react-dom';
import GoalListPage from './containers/GoalListPage';
import DealsApp from './DealsApp';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

const path = window.location.pathname;
let rootElement = '<p>Page not found.</p>';

if (path.match(/^\/deals\//)) {
  rootElement = <DealsApp />

} else if (path.match(/^\/goals\//)) {
  rootElement = <GoalListPage/>
}

ReactDOM.render(
  rootElement,
  document.getElementById('root')
);
