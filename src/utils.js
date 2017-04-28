import { TextInput } from './components/TextInput';
import { SelectInput } from './components/SelectInput';
import { connect } from 'react-redux';

export function createConnectedComponent(
  {
    Component,
    mapStateToProps,
    mapDispatchToProps
  }
) {
  return connect(mapStateToProps, mapDispatchToProps)(Component);
}

export function parseFieldSchema({
  key: id,
  options = null,
  validation = null,
  ...other
}) {
  return {
    id,
    options: options ? options.split('|') : null,
    validation,
    valid: true,
    value: null,
    visited: false,
    ...other
  };
}

export const createFieldComponent = ({
  fields = [],
  onInput = () => {},
  onVisit = () => {}
}) => ({ id }) => {
  const field = fields.find(f => f.id === id);
  const dependentField = field.validation && field.validation.dependsOn
    ? fields.find(f => f.id === field.validation.dependsOn)
    : null;

  const props = {
    key: field.id,
    id: field.id,
    value: field.value,
    options: field.options || null,
    label: field.label,
    placeholder: field.placeholder,
    helperText: field.required ? 'Required field' : '',
    error: !field.valid || (field.required && !field.value && field.visited),
    disabled: false,

    onInput(nextValue) {
      const result = validate(nextValue, field, dependentField);
      onInput({
        id,
        valid: result.valid,
        value: nextValue
      });
    },
    onVisit() {
      onVisit({ id, visited: true });
    }
  };

  const Component = field.fieldType === 'SELECT' ? SelectInput : TextInput;

  return {
    Component,
    props
  };
};

/*
Error state if:
- required, visited, and missing => 'Required field'
- fails validation => [
  'Expected alpha-numeric characters only',
  'Expected a date in the formal MM-DD-YYYY`,
  '
]
 */

const ALPHANUMERIC = /^[0-9a-zA-Z-()+.\s]*$/;
const DAY_IN_MONTH = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31
};

function validate(nextValue, field, dependentField = null) {
  if (field.fieldType === 'TEXT') {
    // Primary field validation (ALPHANUMERIC)
    if (
      field.validation === 'ALPHANUMERIC' ||
      field.validation.type === 'ALPHANUMERIC'
    ) {
      if (!ALPHANUMERIC.test(nextValue)) {
        return {
          valid: false,
          helperText: 'Expected alpha-numeric characters'
        };
      }
    }
    // Primary field validation (DATE)
    else if (
      field.validation === 'DATE' ||
      field.validation.type === 'DATE'
    ) {
      if (!validateDate(nextValue)) {
        return {
          valid: false,
          helperText: 'Expected MM-DD-YYYY date format'
        };
      }
    }

    // Fails dependent field validation
    if (dependentField && field.validation.pattern) {
      const PATTERN = new RegExp(field.validation.pattern.slice(1, -1));
      if (!PATTERN.test(dependentField.value)) {
        return {
          valid: false,
          helperText: `"${dependentField.label}" field is invalid`
        };
      }
    }
  }

  // Passes validation
  return {
    valid: true,
    helperText: null
  };
}

function validateDate(nextValue) {
  try {
    const [month, day, year] = nextValue
      .split('-')
      .map(value => parseInt(value, 10));

    return (
      year >= 1000 &&
      year <= 9999 && // in case of, you know, time travelers
      month >= 1 &&
      month <= 12 &&
      day >= 1 &&
      day <= DAY_IN_MONTH[month]
    );
  } catch (e) {
    return false;
  }
}
