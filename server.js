const Rcon = require('simple-rcon');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('www'));

app.sse = require('litesocket').handler;

app.sse('/events', function (req, res){
  res.send({
    token: jwt.sign({}, 'NOTSECRET')
  });
});

app.post('/connections', function (req, res) {
  console.info(`Initiating new connection to: ${req.body.host}`);
  
  const rcon = new Rcon({
    host: req.body.host,
    port: 25575,
    password: req.body.pass
  })
    .exec('say hi', () => console.log('said hi'))
    
    .connect()
    
    .on('authenticated', function() {
      console.log('Authenticated!');
      res.send("authenticated");
    })
    
    .on('connected', function() {
      console.log('Connected!');
      res.send("connected");
    })
    
    .on('error', err => !err || console.error(err))
    
    .on('disconnected', function() {
      console.log('Disconnected!');
      res.send("disconnected");
    });
});

app.listen(process.env.PORT, process.env.IP);

console.info("server started at " + process.env.IP + ':' + process.env.PORT);