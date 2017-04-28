import React from 'react';
import { updateField } from '../actions';
import { TextInput } from './TextInput';
import { SelectInput } from './SelectInput';
import { validate } from '../utils';

const withValidation = Component => ({
  field,
  dependentField,
  onInput,
  ...props
}) => {
  return (
    <Component onInput={nextValue => {
      const result = validate(nextValue, field, dependentField);
      onInput({
        id: props.id,
        helperText: result.helperText,
        valid: result.valid,
        value: nextValue,
      });
    }}{...props} />);
};

export function createFormField({ id, fieldType }) {
  return {
    Component: fieldType === 'SELECT' ? withValidation(SelectInput) : withValidation(TextInput),
    mapStateToProps(state) {
      const field = state.fields.find(f => f.id === id);

      const dependentField = field.validation && field.validation.dependsOn
        ? state.fields.find(f => f.id === field.validation.dependsOn)
        : null;

      return {
        key: field.id,
        id: field.id,
        value: field.value,
        options: field.options || null,
        label: field.label,
        placeholder: field.placeholder,
        helperText: field.helperText || (field.required ? 'Required field' : ''),
        error: !field.valid || (field.required && !field.value && field.visited),
        disabled: false,
        field,
        dependentField
      };
    },
    mapDispatchToProps(dispatch) {
      return {
        onInput(payload) {
          dispatch(updateField(payload));
        },
        onVisit() {
          dispatch(updateField({ id, visited: true }));
        }
      };
    }
  };
}
