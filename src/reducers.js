import { SET_COUNTRY, REPLACE_FIELDS, UPDATE_FIELD } from './actions';

export const countryInitialState = null;
export const countryReducer = (state = countryInitialState, action) => {
  switch (action.type) {
    case SET_COUNTRY:
      return action.payload;
    default:
      return state;
  }
};

export const fieldsInitialState = [];
export const fieldsReducer = (state = fieldsInitialState, action) => {
  switch (action.type) {
    case REPLACE_FIELDS:
      return action.payload;
    case UPDATE_FIELD:
      return state.map(
        field =>
          (field.id === action.payload.id
            ? { ...field, ...action.payload }
            : field)
      );
    default:
      return state;
  }
};
