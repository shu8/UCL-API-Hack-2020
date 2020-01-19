const router = require('express').Router()

const moment = require('moment');
const randomstring = require('randomstring');
const util = require('util');
const nodeRequest = require('request');

const client_id = '2661579838577730.2946903875356405';
const client_secret = '24b4d9c7d9a8cf30679873c6c20910efea34f8d6fe238bb01ec80c0b101da898';

router.get('/authorise', (request, response) => {
  let state = randomstring.generate();

  req.app.locals.oauthMoments[state] = moment();

  response.redirect(util.format('https://uclapi.com/oauth/authorise?client_id=%s&state=%s', client_id, state));
});

router.get('/callback', (request, response) => {
  if (request.query.state in req.app.locals.oauthMoments) {
    if (moment(req.app.locals.oauthMoments[request.query.state]).add(300, 'seconds') > moment()) {
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

            req.app.locals.sessions[auth_key] = {
              'full_name': body.full_name,
              'given_name': body.given_name,
              'email': body.email,
              'department': body.department,
              'cn': body.cn,
              'upi': body.upi,
              'scope_number': body.scope_number,
              'is_student': body.is_student,

              'token': token,
              'auth_key': auth_key
            };

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

router.get('/userdata/:key', (request, response) =>
  response.json(request.params.key in req.app.locals.sessions ? req.app.locals.sessions[request.params.key] : {
    error: "I am error."
  })
);

module.exports = router
