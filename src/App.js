import React, { Component } from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import { FormView } from './components/FormView';
import { countryReducer, fieldsReducer } from './reducers';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    this.store = createStore(
      combineReducers({
        country: countryReducer,
        fields: fieldsReducer
      }),
      composeEnhancers(applyMiddleware(thunkMiddleware))
    );
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="App">
          <FormView />
        </div>
      </Provider>
    );
  }
}

export default App;
