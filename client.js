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
      
        ${field('host', state.host, 'mc.yourdomain.com', ev => send('host', {val: ev.target.value}))}
        ${field('port', state.port, '25575', ev => send('port', {val: ev.target.value}), 'number')}
        ${field('pass', state.pass, '', ev => send('pass', {val: ev.target.value}), 'password')}
        ${field('cmd', state.cmd, 'say Hello Minecraft!', ev => send('cmd', {val: ev.target.value}))}
        
        <input type="submit" value="Execute Command"/>
      </form>
      <output>${stat}</output>
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
}

function field(name, value, placeholder, oninput, type='text') {
  return choo.view`
    <label style="text-transform: capitalize">${name}
      <input name=${name} 
        type=${type}
        placeholder=${placeholder} 
        value=${value}
        oninput=${oninput}/>
    </label>
  `;
}