import * as Constants from './Constants';

export default function() {}

export function apiGet(endpoint, callback) {
  // TODO error handling
  fetch(`${Constants.API_URL}/${endpoint}`, {
    method: 'GET',
    headers: {
      'X-AUTH-KEY': Constants.SESSION_ID,
    },
  })
    .then(res => res.json())
    .then(res => callback(res));
}

export function apiPost(endpoint, data, callback) {
  fetch(`${Constants.API_URL}/${endpoint}`, data, {
    method: 'POST',
    data,
    headers: {
      'X-AUTH-KEY': Constants.SESSION_ID,
    },
  })
    .then(res => res.json())
    .then(res => callback(res));
}
