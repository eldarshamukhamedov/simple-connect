import { setCountry, updateField } from '../actions';
import { createConnectedComponent } from '../utils';
import { FormView } from './FormView';

export function createManager() {
  return {
    Component: FormView,
    mapStateToProps(state) {
      return {
        fields: state.fields,
        heading: state.country === null
          ? 'Welcome to Simple Connect'
          : state.country,
        submitLabel: 'Next',
        submitDisabled: state.fields.some(field => !field.valid)
      };
    },
    mapDispatchToProps(dispatch) {
      return {
        onInput(payload) {
          dispatch(updateField(payload));
        },
        onSubmit(fields) {
          const data = fields.reduce((carry, item) => {
            carry[item.id] = item.value;
            return carry;
          }, {});
          if (data.country) {
            dispatch(setCountry(data.country.toLowerCase()));
          } else {
            console.log('Submitting data', data);
          }
        }
      };
    }
  };
}

export const Manager = createConnectedComponent(createManager());
