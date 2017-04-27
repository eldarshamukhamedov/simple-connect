import React from 'react';
import { string } from 'prop-types';

import { TextInput } from './TextInput';
import { SelectInput } from './SelectInput';

import './FormView.css';

export class FormView extends React.Component {
  render() {
    return (
      <section className="form-view">
        <TextInput
          id="first_name"
          label="First name"
          placeholder=""
        />
        <SelectInput
          id="sex"
          label="Sex"
          placeholder="Select sex"
          options={'Male|Female|Other'.split('|')}
        />
      </section>
    );
  }
}
FormView.propTypes = {
  country: string
};
FormView.defaultProps = {};
