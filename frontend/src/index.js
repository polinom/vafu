import React from 'react';
import ReactDOM from 'react-dom';
import DealPage from './containers/DealPage';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

const rootElement = window.location.pathname.match(/^\/deals\//) ? <DealPage /> : <p>Goals page</p>;

ReactDOM.render(
  rootElement,
  document.getElementById('root')
);
