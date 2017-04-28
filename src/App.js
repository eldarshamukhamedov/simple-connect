import React, { Component } from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import { Manager } from './components/Manager';
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
          <Manager />
        </div>
      </Provider>
    );
  }
}

export default App;
