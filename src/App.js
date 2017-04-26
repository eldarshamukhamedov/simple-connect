import React, { Component } from 'react';
import './App.css';

import { TextInput } from './components/TextInput';
import { SelectInput } from './components/SelectInput';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TextInput id="text-normal" />
        <TextInput id="text-error" error />
        <TextInput id="text-disabled" disabled />
        <SelectInput id="select-normal"
          options={['California', 'Washington', 'Alaska']}
        />
        <SelectInput id="select-selected"
          options={['California', 'Washington', 'Alaska']}
          selected="California"
        />
        <SelectInput id="select-empty" />
        <SelectInput id="select-disabled" disabled />
        <SelectInput id="select-error"
          options={['California', 'Washington', 'Alaska']}
          error
        />
      </div>
    );
  }
}

export default App;
