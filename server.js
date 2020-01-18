const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Hello, world!'));

app.get('/', function (req, res) {
    // do complicated stuff



    return res.send('Hello, world!');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
