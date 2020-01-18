const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
