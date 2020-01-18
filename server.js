const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
<<<<<<< HEAD
=======

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});
>>>>>>> 80be58e65e2141f3abb944e81bd62b9c15626db9

app.get('/', (req, res) => res.send('Hello, world!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
