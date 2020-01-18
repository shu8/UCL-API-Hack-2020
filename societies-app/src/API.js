import * as Constants from './Constants';

export default function apiGet(endpoint, sessionId, callback) {
  // TODO error handling
  fetch(`${Constants.API_URL}/${endpoint}`, {
    method: 'GET',
    headers: {
      'X-AUTH-KEY': sessionId,
    },
  })
    .then(res => res.json())
    .then(res => callback(res));
}
