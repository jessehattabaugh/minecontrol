exports.host = (action, state) => set('host', action.val, state),

exports.port = (action, state) => set('port', action.val, state),

exports.pass = (action, state) => set('pass', action.val, state),

exports.cmd = (action, state) => set('cmd', action.val, state),

// add command/response entries to the log
exports.log = (action, state) => Object.assign({}, state, {
  log: state.log.concat(action)
});

// display the settings panel
exports.settings = (action, state) => Object.assign({}, state, {
  settings: !state.settings,
  history: false
});

// display the history panel
exports.history = (action, state) => Object.assign({}, state, {
  settings: false,
  history: !state.history
});

function set(key, val, state) {
  const out = {};
  out[key] = val;
  return Object.assign({}, state, out);
}