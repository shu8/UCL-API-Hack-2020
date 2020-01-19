export const API_URL = 'https://uclapisoc.jezz.me/api';
export const SESSION_ID = window.sessionStorage.getItem('sessionId');
export const mysqlToJsDate = mysqlDate => {
  if (!mysqlDate) return new Date();
  const t = mysqlDate.replace('T', ' ').replace('Z', '').split(/[- :]/);
  return new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
};
