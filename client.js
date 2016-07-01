const choo = require('choo');

const app = choo();
 
app.model({
  state: {
    host: 'mc.hatta.bike',
    port: 25575,
    pass: 'wubalubadubdub',
    cmd: 'time set day',
    log: [],
    settings: true,
    history: false
  },
  reducers: require('./reducers'),
  effects: require('./effects')
});
 
app.router((route) => [
  route('/', require('./main.js'))
]);
 
app.start('app');


