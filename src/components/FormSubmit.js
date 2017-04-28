import React from 'react';
import { Button } from './Button';
import { fetchCountryData, nextPage } from '../actions';

const withFields = Component => ({
  fields,
  onClick,
  ...props
}) => {
  return (
    <Component onClick={() => onClick(fields)} {...props} />
  );
};

function areFieldsValid(fields) {
  return !fields.some(field => !field.valid || (field.required && !field.value));
}

function mapStateToDisabledButton(fields, {cursor, count}) {
  const page = fields.slice(cursor, cursor + count);
  return !areFieldsValid(page);
}

function mapStateToButtonLabel(fields, {cursor, count}) {
  if (
    fields.find(f => f.id === 'countrySelect') ||
    cursor + count < fields.length
  ) {
    return 'Next';
  }

  return 'Submit';
}

export function createFormSubmit() {
  return {
    Component: withFields(Button),
    mapStateToProps(state) {
      return {
        fields: state.fields,
        label: mapStateToButtonLabel(
          state.fields,
          state.pager
        ),
        disabled: mapStateToDisabledButton(
          state.fields,
          state.pager
        )
      };
    },
    mapDispatchToProps(dispatch) {
      return {
        onClick(fields) {
          // If selecting country
          if (fields.find(f => f.id === 'countrySelect')) {
            dispatch(fetchCountryData(fields[0].value.toLowerCase()));
          }
          // Done with form
          else if (areFieldsValid(fields)) {
            console.log('Submission', fields);
          }
          // Done with page
          else {
            dispatch(nextPage());
          }
        }
      };
    }
  };
}
