import React from 'react';
import { any, string, bool, func, arrayOf, shape, oneOf } from 'prop-types';

import { Button } from './Button';
import { TextInput } from './TextInput';
import { SelectInput } from './SelectInput';

import './FormView.css';

const createFieldComponent = (fields, onInput) => ({ id }) => {
  const {
    fieldType,
    label,
    options = null,
    placeholder,
    required,
    // valid,
    // validation = null,
    value
    // visited
  } = fields.find(field => field.id === id);

  const props = {
    key: id,
    id,
    value,
    options: options.split('|'),
    label,
    placeholder,
    helperText: required ? 'Required field' : '',
    error: false,
    disabled: false,
    onInput(nextValue) {
      onInput({
        id,
        valid: true,
        value: nextValue,
        visited: true
      });
    }
  };

  const Component = fieldType === 'SELECT' ? SelectInput : TextInput;
  return {
    Component,
    props
  };
};

export class FormView extends React.Component {
  render() {
    const content = this.props.fields
      .map(createFieldComponent(this.props.fields, this.props.onInput))
      .map(({ Component, props }) => <Component {...props} />);

    return (
      <section className="form-view">
        <header><h2>{this.props.heading}</h2></header>
        <section className="content">
          {content}
        </section>
        <footer>
          <Button
            label={this.props.submitLabel}
            disabled={this.props.submitDisabled}
            onClick={() => this.props.onSubmit(this.props.fields)}
          />
        </footer>
      </section>
    );
  }
}
FormView.propTypes = {
  fields: arrayOf(
    shape({
      id: string,
      label: string,
      placeholder: string,
      fieldType: oneOf(['TEXT', 'SELECT']),
      validation: oneOf([
        'ALPHANUMERIC',
        'DATE',
        shape({
          type: oneOf(['ALPHANUMERIC', 'DATE']),
          dependsOn: string,
          pattern: string
        })
      ]),
      options: string,
      required: bool,
      valid: bool,
      value: string,
      visited: bool
    })
  ).isRequired,
  heading: string.isRequired,
  submitLabel: string.isRequired,
  submitDisabled: bool.isRequired,
  submitValue: any,
  onInput: func.isRequired,
  onSubmit: func.isRequired
};
FormView.defaultProps = {
  fields: [],
  heading: 'Form View',
  submitLabel: 'Next',
  submitDisabled: true,
  submitValue: {},
  onInput() {},
  onSubmit() {}
};
