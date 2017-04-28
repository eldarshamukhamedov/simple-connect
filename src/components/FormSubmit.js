import React from 'react';
import { Button } from './Button';
import { fetchCountryData } from '../actions';

const withFields = Component => ({
  fields,
  onClick,
  ...props
}) => {
  return (
    <Component onClick={() => onClick(fields)} {...props} />
  );
};

export function createFormSubmit() {
  return {
    Component: withFields(Button),
    mapStateToProps(state) {
      return {
        fields: state.fields,
        label: 'Next',
        disabled: state.fields.some(field => (
          !field.valid || (field.required && !field.value)
        ))
      };
    },
    mapDispatchToProps(dispatch) {
      return {
        onClick(fields) {
          const data = fields.reduce((carry, item) => {
            carry[item.id] = item.value;
            return carry;
          }, {});

          if (data.countrySelect) {
            dispatch(fetchCountryData(data.countrySelect.toLowerCase()));
          } else {
            console.log('Submitting data', data);
          }
        }
      };
    }
  };
}
