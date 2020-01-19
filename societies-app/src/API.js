import * as Constants from './Constants';

export default function apiGet(endpoint, callback) {
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
