const express = require('express');
const app = express();
const port = 3000;

const randomstring = require('randomstring');
const util = require('util');
const moment = require('moment');
const nodeRequest = require('request');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '0.0.0.0',
  user: 'dbuser',
  password: 'password',
  database: 'uclapisoc'
});
connection.connect();

const client_id = '2661579838577730.2946903875356405';
const client_secret = '24b4d9c7d9a8cf30679873c6c20910efea34f8d6fe238bb01ec80c0b101da898';

let oauthMoments = {};
let sessions = {};

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

app.get('/oauth/authorise', (request, response) => {
  let state = randomstring.generate();

  oauthMoments[state] = moment();

  response.redirect(util.format('https://uclapi.com/oauth/authorise?client_id=%s&state=%s', client_id, state));
});

app.get('/oauth/callback', (request, response) => {
  if (request.query.state in oauthMoments) {
    if (moment(oauthMoments[request.query.state]).add(300, 'seconds') > moment()) {
      if (request.query.result == 'denied') {
        response.send(util.format('The login operation for state %s was denied', request.query.state));
      } else {
        // Successful login
        let tokenUrl = util.format('https://uclapi.com/oauth/token?client_id=%s&client_secret=%s&code=%s', client_id, client_secret, request.query.code);
        console.log('Token URL: ' + tokenUrl);

        let token = '';
        nodeRequest(tokenUrl, {
          json: true
        }, (err, res, body) => {

          if (err) {
            return console.log(err);
          }

          token = body.token;
          console.log('Got token: ' + token);

          nodeRequest(util.format('https://uclapi.com/oauth/user/data?client_secret=%s&token=%s', client_secret, token), {
            json: true
          }, (err, res, body) => {
            if (err) {
              return console.log(err);
            }

            let auth_key = randomstring.generate();
            let user = {
              'name': body.full_name,
              'department': body.department,
              'token': token,
              'auth_key': auth_key
            }

            sessions[auth_key] = user;

            response.redirect(util.format('/login/success?key=%s', auth_key));
          });
        });
      }
    } else {
      throw new Error('Authorisation took more than 5 minutes, so it has failed');
    }
  } else {
    throw new Error('State does not exist.');
  }
});

app.get('/oauth/userdata/:key', (request, response) =>
  response.json(request.params.key in sessions ? {
    'name': sessions[request.params.key]['name'],
    'department': sessions[request.params.key]['department']
  } : {})
);

app.get('/api', (req, res) => res.send('Hello, world!'));

app.listen(port, () => console.log(`UCL API Hack 2020 app listening on port ${port}!`));
