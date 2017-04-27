import React, { Component } from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import { Manager } from './components/Manager';
import { countryReducer, fieldsReducer } from './reducers';
import { replaceFields } from './actions';

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
      }),
      composeEnhancers(applyMiddleware(thunkMiddleware))
    );

    // Populate fields with a country selector
    this.store.dispatch(
      replaceFields([
        {
          id: 'country',
          label: 'Country',
          placeholder: 'Select country',
          fieldType: 'SELECT',
          options: 'Mexico|India',
          required: true,
          valid: false,
          value: null,
          visited: false
        }
      ])
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
