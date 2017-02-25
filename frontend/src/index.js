import React from 'react';
import ReactDOM from 'react-dom';
import DealPage from './containers/DealPage';
import GoalPage from './containers/GoalPage';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

const path = window.location.pathname;
let rootElement = '<p>Page not found.</p>';

if (path.match(/^\/deals\//)) {
  rootElement = <DealPage />

} else if (path.match(/^\/goals\//)) {
  rootElement = <GoalPage />
}

ReactDOM.render(
  rootElement,
  document.getElementById('root')
);
