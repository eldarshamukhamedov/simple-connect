import { connect } from 'react-redux';

export function createConnectedComponent({
  Component,
  mapStateToProps,
  mapDispatchToProps
}) {
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
    helperText: null,
    options: options ? options.split('|') : null,
    validation,
    valid: true,
    value: null,
    visited: false,
    height: other.fieldType === 'SELECT' ? 3 : 1,
    ...other
  };
}

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

export function validate(nextValue, field, dependentField = null) {
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
      /^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}$/.test(nextValue) &&
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

export function mapFieldsToPages(fields) {
  const MAX_HEIGHT = 4;
  const {
    pages,
    lastPage
  } = fields.reduce((carry, field, index) => {
    if (field.height > MAX_HEIGHT) {
      if (carry.lastPage.height > 0) carry.pages.push(carry.lastPage);
      carry.lastPage = { start: index+1, end: index+1, height: 0 };
    }
    else if (carry.lastPage.height + field.height > MAX_HEIGHT) {
      carry.pages.push(carry.lastPage);
      carry.lastPage = { start: index, end: index, height: field.height };
    }
    else {
      carry.lastPage.end = index;
      carry.lastPage.height += field.height;
    }
    return carry;
  }, {
    pages: [],
    lastPage: { start: 0, end: 0, height: 0 }
  });

  if (lastPage.height > 0) pages.push(lastPage);

  return pages;
}
