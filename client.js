const choo = require('choo');
const http = require('choo/http');

const app = choo();
 
app.model({
  state: {
    host: 'mc.hatta.bike',
    port: 25575,
    pass: 'wubalubadubdub',
    cmd: 'time set day',
    prev: []
  },
  
  reducers: {
    //host: (action, state) => Object.assign({}, state, {host: action.val}),
    host: (action, state) => set('host', action.val, state),
    port: (action, state) => set('port', action.val, state),
    pass: (action, state) => set('pass', action.val, state),
    cmd: (action, state) => set('cmd', action.val, state)
  },
  
  effects: {
    // print some info to the console
    info: (action, state) => console.info(action.msg),
    
    // print an error to the console
    error: (action, state) => console.error(`error: ${action.msg}`),
    
    // send a command to the server
    exec: function (action, state, send) {
      
      //console.log('exec effect state: ', state);
      //console.dir(arguments);
      
      http.post('/exec', {json: state}, function (err, res, body) {
        if (err) {
          return send('error', err.msg);
        }
        if (res.statusCode !== 200 || !body) {
          return send('error', 'http request failed');
        }
        //console.log('post callback body: ', body);
        if (body.errno) {
          send('error', `${body.code}: couldn't ${body.syscall} to ${body.address}:${body.port}`);
        } else {
          send('info', {
            msg: body.body
          });
        }
      });
    }
  }
});
 
const mainView = function (params, state, send) {
  
  //console.dir(arguments);
  
  function onsubmit(ev) {
    ev.preventDefault();
    send('exec');
  }
  
  return choo.view`
    <main id="app">
      <h1>Minecontrol</h1>
      <form method="post" action="exec" onsubmit=${onsubmit}>
        <label>Host
          <input name="host" 
            type="text"
            placeholder="mc.yourdomain.com" 
            value=${state.host}
            oninput=${ev => send('host', {val: ev.target.value})}/>
        </label>
        
        <label>Port
          <input name="port" 
            type="number" 
            placeholder="25575" 
            value=${state.port}
            oninput=${ev => send('port', {val: ev.target.value})}/>
        </label>
        
        <label>Password
          <input name="pass" 
            type="password" 
            value=${state.pass}
            oninput=${ev => send('pass', {val: ev.target.value})}/>
        </label>
        
        <label>Command
          <input name="cmd" 
            type="text" 
            placeholder="say hello world" 
            value=${state.cmd}
            oninput=${ev => send('cmd', {val: ev.target.value})}/>
        </label>
        
        <input type="submit" value="Execute Command"/>
      </form>
    </main>
  `;
};
 
app.router((route) => [
  route('/', mainView)
]);
 
app.start('app');


function set(key, val, state) {
  const out = {};
  out[key] = val;
  return Object.assign({}, state, out);
};