const choo = require('choo');
const http = require('choo/http');

const app = choo();
 
app.model({
  state: {
    host: null,
    port: null,
    pass: null,
    cmd: null
  },
  
  reducers: {
    host: (action, state) => Object.assign({}, state, {host: action.val}),
    port: (action, state) => Object.assign({}, state, {host: action.val}),
    pass: (action, state) => Object.assign({}, state, {host: action.val}),
    cmd: (action, state) => Object.assign({}, state, {host: action.val}),
  },
  
  effects: {
    
    // print some info to the console
    info: (state, event) => console.info(`info: ${event.msg}`),
    
    // print an error to the console
    error: (state, event) => console.error(`error: ${event.msg}`),
    
    // send a command to the server
    exec: function (state, action, send) {
      http.post('/exec', { json: state }, function (err, res, body) {
        if (err) 
          return send('error', { msg: err.message });
        if (res.statusCode !== 200 || !body) {
          return send('error', { msg:'something went wrong' });
        }
        send('info', { msg: body });
      });
    }
  }
});
 
const mainView = function (params, state, send) {
  
  function onsubmit(ev) {
    ev.preventDefault();
    send('exec');
  }
  
  return choo.view`
    <main id="app">
      <h1>Minecontrol</h1>
      <form method="post" action="exec" onsubmit=${onsubmit}>
        <label>Host
          <input name="host" type="text" placeholder="mc.yourdomain.com" oninput=${ev => send('host', {val: ev.target.value})}>
        </label>
        
        <label>Port
          <input name="port" type="number" placeholder="25575" oninput=${ev => send('port', {val: ev.target.value})}>
        </label>
        
        <label>Password
          <input name="pass" type="password" oninput=${ev => send('pass', {val: ev.target.value})}>
        </label>
        
        <label>Command
          <input name="cmd" type="text" placeholder="say hello world" oninput=${ev => send('cmd', {val: ev.target.value})}>
        </label>
        
        <input type="submit" value="Execute Command">
      </form>
    </main>
  `;
};
 
app.router((route) => [
  route('/', mainView)
]);
 
app.start('app');