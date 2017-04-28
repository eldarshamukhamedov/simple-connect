import React, { Component } from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import { FormManager } from './components/FormManager';
import { countryReducer, fieldsReducer } from './reducers';
import { parseFieldSchema } from './utils';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // Setup Redux store, middleware, and reducers
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    this.store = createStore(
      combineReducers({
        country: countryReducer,
        fields: fieldsReducer
      }), {
        country: null,
        fields: [parseFieldSchema({
          key: 'countrySelect',
          label: 'Country',
          placeholder: 'Select country',
          fieldType: 'SELECT',
          options: 'Mexico|India|Test',
          required: true
        })]
      },
      composeEnhancers(applyMiddleware(thunkMiddleware))
    );
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="App">
          <FormManager />
        </div>
      </Provider>
    );
  }
}

export default App;
