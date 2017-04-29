import {
  SET_COUNTRY,
  REPLACE_FIELDS,
  UPDATE_FIELD,
  REPLACE_PAGES,
  NEXT_PAGE
} from './actions';

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
          field.id === action.payload.id
            ? { ...field, ...action.payload }
            : field
      );
    default:
      return state;
  }
};

export const pagerInitialState = { pages: [], cursor: 0, count: 4 };
export const pagerReducer = (state = pagerInitialState, action) => {
  switch (action.type) {
    case REPLACE_PAGES:
      return { ...state, pages: action.payload };
    case REPLACE_FIELDS:
      // Reset cursor for replaced fields
      return pagerInitialState;
    case NEXT_PAGE:
      return { ...state, cursor: state.cursor + 4 };
    default:
      return state;
  }
};
