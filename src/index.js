import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

function render(App) {
  ReactDOM.render(<App />, document.getElementById('root'));
}
render(App);

// Hot module reloading
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
