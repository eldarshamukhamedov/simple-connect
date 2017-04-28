import React from 'react';
import { updateField } from '../actions';
import { TextInput } from './TextInput';
import { SelectInput } from './SelectInput';
import { validate } from '../utils';

// HOC: Pass 
export const withDependencies = Component => ({
  field,
  dependsOnField,
  dependentFields,
  onInput,
  ...props
}) => {
  return (
    <Component onInput={nextValue => onInput(
      nextValue,
      field,
      dependsOnField,
      dependentFields
    )} {...props} />);
};

export function mapFieldToHelperText(field) {
  // Previously focused, show helper text
  if (field.visited && field.helperText) {
    return field.helperText;
  }
  // Indicate a required field
  else if (field.required) {
    return 'Required field';
  }
  return '';
}

export function mapFieldToError(field) {
  // Previously focused, but failed validation
  if (field.visited && !field.valid) {
    return true;
  }
  // Previous focused, but missing required value
  else if (field.visited && field.required && !field.value) {
    return true;
  }
  return false;
}

export function createFormField({ id, fieldType }) {
  return {
    Component: withDependencies(fieldType === 'SELECT' ? SelectInput : TextInput),
    mapStateToProps(state) {
      // Primary field
      const field = state.fields.find(f => f.id === id);

      // Field this field's validation depends on
      const dependsOnField = field.validation && field.validation.dependsOn
        ? state.fields.find(f => f.id === field.validation.dependsOn)
        : null;

      // Fields that depend on this field for validation
      const dependentFields = state.fields.filter(f => f.validation && f.validation.dependsOn === field.id);

      return {
        key: field.id,
        id: field.id,
        value: field.value,
        options: field.options || null,
        label: field.label,
        placeholder: field.placeholder,
        helperText: mapFieldToHelperText(field),
        error: mapFieldToError(field),
        disabled: false,
        field,
        dependsOnField,
        dependentFields
      };
    },
    mapDispatchToProps(dispatch) {
      return {
        onInput(nextValue, field, dependsOnField, dependentFields) {
          // Update primary field
          const validationResult = validate(nextValue, field, dependsOnField);
          dispatch(updateField({
            id: field.id,
            value: nextValue,
            ...validationResult
          }));

          // Update all fields that depends on this field
          dependentFields.forEach(dependent => {
            const validationResult = validate(dependent.value, dependent, {
              ...field,
              value: nextValue
            });

            dispatch(updateField({
              id: dependent.id,
              ...validationResult
            }));
          });
        },
        onVisit() {
          dispatch(updateField({ id, visited: true }));
        }
      };
    }
  };
}
