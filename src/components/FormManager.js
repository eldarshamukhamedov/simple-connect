import { createConnectedComponent } from '../utils';
import { FormView } from './FormView';

export function createFormManager() {
  return {
    Component: FormView,
    mapStateToProps(state) {
      return {
        fields: state.fields,
        heading: state.country === null
          ? 'Welcome to Simple Connect'
          : state.country
      };
    }
  };
}

export const FormManager = createConnectedComponent(createFormManager());
