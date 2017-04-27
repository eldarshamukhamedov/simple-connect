export const SET_COUNTRY = 'SET_COUNTRY';
export function setCountry(country = null) {
  return {
    type: SET_COUNTRY,
    payload: country
  };
}

export const REPLACE_FIELDS = 'REPLACE_FIELDS';
export function replaceFields(fields = []) {
  return {
    type: REPLACE_FIELDS,
    payload: fields
  };
}

export const UPDATE_FIELD = 'UPDATE_FIELD';
export function updateField(field = {}) {
  return {
    type: UPDATE_FIELD,
    payload: field
  };
}

export function fetchQuestions(country) {
  return function (dispatch) {
    return fetch(`//localhost:3000/${country}`)
      .then(response => response.json())
      .then(({ country, fields }) => {
        dispatch(setCountry(country));
        dispatch(replaceFields(fields));
      })
      .catch(error => {
        // Would typically retry, or attempt to recover here, but YOLO
      });
  };
}