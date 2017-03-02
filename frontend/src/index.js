import React from 'react';
import ReactDOM from 'react-dom';
import DealsApp from './DealsApp';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import App from './App';

const path = window.location.pathname;
let rootElement = (<p>Page not found.</p>);

if (path.match(/^\/deals\//)) {
  rootElement = <DealsApp />

} else if (path.match(/^\/goals\//) || path.match(/^\/users\/[\w.@+-]+\/$/)) {
  rootElement = <App />
}

ReactDOM.render(
  rootElement,
  document.getElementById('root')
);
