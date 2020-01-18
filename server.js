const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/views/index.html');
});

app.get('/api', (req, res) => res.send('Hello, world!'));

app.listen(port, () => console.log(`UCL API Hack 2020 app listening on port ${port}!`));
