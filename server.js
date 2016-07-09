const express = require('express');
const bodyParser = require('body-parser');
const Rcon = require('simple-rcon');

const host = process.env.IP || 'localhost';
const port = process.env.PORT || 8080;

const app = express();

app.use(express.static('static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/exec', function (req, res) {
  console.info(`Command recieved`);
  new Rcon({
    host: req.body.host,
    port: req.body.port || 25575,
    password: req.body.pass
  })
    .connect()
    .exec(req.body.cmd, function (msg) {
      console.log(msg);
      res.json(msg);
    })
    .on('error', function (err){
      console.error(err);
      res.json(err);
    });
});

app.listen(port, host, function () {
  console.info(`Server started at http://${host}:${port}`);
});
