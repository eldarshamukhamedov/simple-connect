import { mapFieldsToPages, parseFieldSchema } from './utils';

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

export const REPLACE_PAGES = 'REPLACE_PAGES';
export function replacePages(pages) {
  return {
    type: REPLACE_PAGES,
    payload: pages
  };
}

export const NEXT_PAGE = 'NEXT_PAGE';
export function nextPage() {
  return { type: NEXT_PAGE };
}

export function fetchCountryData(country) {
  return function(dispatch) {
    return fetch(`//localhost:3000/${country}.json`)
      .then(response => response.json())
      .then(({ country, fields }) => {
        // Assign heights
        const parsedFields = fields.map(parseFieldSchema);
        const pages = mapFieldsToPages(parsedFields);

        dispatch(replaceFields(parsedFields));
        dispatch(replacePages(pages));
        dispatch(setCountry(country));
      })
      .catch(error => {
        // Would typically retry, or attempt to recover here, but YOLO
      });
  };
}
