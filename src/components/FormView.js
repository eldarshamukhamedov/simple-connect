import React from 'react';
import { string, bool, arrayOf, shape, oneOf, oneOfType } from 'prop-types';
import { createFormField } from './FormField';
import { createFormSubmit } from './FormSubmit';
import { createConnectedComponent } from '../utils';
import './FormView.css';

export class FormView extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.heading !== nextProps.heading ||
      !this.props.fields.every((v,i) => v.id === nextProps.fields[i].id)
    );
  }

  render() {
    const content = this.props.fields
      .map(field => {
        const Component = createConnectedComponent(createFormField(field));
        return <Component key={field.id} />
      });
    
    const SubmitButton = createConnectedComponent(createFormSubmit());

    return (
      <section className="form-view">
        <header><h2>{this.props.heading}</h2></header>
        <section className="content">
          {content}
        </section>
        <footer>
          <SubmitButton />
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
      validation: oneOfType([
        oneOf(['ALPHANUMERIC', 'DATE']),
        shape({
          type: oneOf(['ALPHANUMERIC', 'DATE']),
          dependsOn: string,
          pattern: string
        })
      ]),
      options: arrayOf(string),
      required: bool,
      valid: bool,
      value: string,
      visited: bool
    })
  ).isRequired,
  heading: string.isRequired,
};
FormView.defaultProps = {
  fields: [],
  heading: 'Form View'
};
