const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.locals.connection = require('mysql').createConnection({
  host: 'localhost',
  user: 'uclapisocuser',
  password: 'uclapisocpassword',
  database: 'uclapisoc'
});
app.locals.connection.connect();

app.locals.oauthMoments = {};
app.locals.sessions = {
  'Ger2DDZebbCXMWe9MVzbhApJvSs8SDeR': {
    "full_name": "Jeremy Lo Ying Ping",
    "given_name": "Jeremy",
    "email": "zcabjlo@ucl.ac.uk",
    "department": "Dept of Computer Science",
    "cn": "zcabjlo",
    "upi": "jloyi01",
    "scope_number": 0,
    "is_student": true,
    "token": "uclapi-user-d2ae46e1c02283a-221bce686c260ff-80393ed5d5c48c5-3cdf264e75ee068",
    "auth_key": "Ger2DDZebbCXMWe9MVzbhApJvSs8SDeR"
  }
};

app.use(express.static('societies-app/build'));

app.get('/', (req, res) => res.sendFile(__dirname + '/societies-app/build/index.html'));

app.use('/oauth', require('./routes/oauth'));
app.use('/api', require('./routes/api'));

app.listen(port, () => console.log(`UCL API Hack 2020 app listening on port ${port}!`));
