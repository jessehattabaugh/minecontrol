const http = require('choo/http');

exports.info = (action, state) => console.info(action.msg);
exports.error = (action, state) => console.error(`error: ${action.msg}`);
exports.exec = exec;

// send a command to the server
function exec(action, state, send) {
  http.post('/exec', {json: state}, function (err, res, body) {
    if (err) {
      return send('error', err.msg);
    }
    if (res.statusCode !== 200 || !body) {
      return send('error', 'http request failed');
    }
    if (body.errno) {
      send('error', `${body.code}: couldn't ${body.syscall} to ${body.address}:${body.port}`);
    } else {
      
      // save the cmd and response for later
      send('log', {
        cmd: state.cmd,
        res: body.body
      });
      
      // reset the cmd field
      send('cmd', {val: ''});
      
      send('info', {
        msg: body.body
      });
    }
  });
}
