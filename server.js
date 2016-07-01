const express = require('express');
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Rcon = require('simple-rcon');

app.use(express.static('static'));

app.post('/exec', function (req, res) {
  new Rcon({
    host: req.body.host,
    port: req.body.port || 25575,
    password: req.body.pass
  })
    .connect()
    .exec(req.body.cmd, msg => res.json(msg))
    .on('error', err => res.json(err));
});

app.listen(process.env.PORT, process.env.IP, function () {
  console.info(`Server started at http://${process.env.IP}:${process.env.PORT}`);
});
