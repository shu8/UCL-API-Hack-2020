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
app.locals.sessions = {};

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(__dirname + '/societies-app/public/index.html'));

app.use('/oauth', require('./routes/oauth'));
app.use('/api', require('./routes/api'));

app.listen(port, () => console.log(`UCL API Hack 2020 app listening on port ${port}!`));
