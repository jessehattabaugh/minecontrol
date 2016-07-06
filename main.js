const choo = require('choo');
const styles = require('./styles');

module.exports = view;

function view(params, state, send) {

  function exec(ev) {
    ev.preventDefault();
    send('exec');
  }

  return choo.view`
    <main id="app" style=${styles.container}>
      
      <header style="${styles.spread} ${styles.grass}">
        <button onclick=${() => send('settings')}>⚙</button>
        <h1 style="font-size: 1.5em; margin: 0">⛏Minecontrol</h1>
        <button onclick=${() => send('history')}>⌘</button>
      </header>
      
      <aside style="${styles.panel} left: ${state.settings ? 0: -100}%">
        <h2>Settings</h2>
        ${field('host', state.host, 'mc.yourdomain.com', ev => send('host', {val: ev.target.value}))}
        ${field('port', state.port, '25575', ev => send('port', {val: ev.target.value}), 'number')}
        ${field('pass', state.pass, '', ev => send('pass', {val: ev.target.value}), 'password')}
        <button onclick=${() => send('settings')}>Save Settings</button>
      </aside>
      
      <aside style="
        ${styles.panel} 
        right: ${state.history ? 0: -100}%;
        display: none; /*DISABLED*/
        ">
        <h2>Recent commands</h2>
        <ul>
          ${recent(state)}
        </ul>
        <button onclick=${() => send('history')}>Close</button>
      </aside>
      
      <article style="flex-grow: 1;">
        
        <form onsubmit=${exec}
          style="position: absolute; 
            bottom: 0; 
            display: flex; 
            width: 100%;
            margin: 0;">
          <div style="flex-grow: 1;">
            
            <input name="cmd" 
              type="text" 
              placeholder="enter commands here" 
              onkeyup=${ev => send('cmd', {
                val: ev.target.value.charAt(0).toLowerCase() + ev.target.value.slice(1)
              })}
              style="
                ${styles.io} 
                border-bottom: none;
              "
              value="${state.cmd}" />
            
            <output style="${styles.io}
              color: grey;
              border-top: none;
            ">
              <span style="font-size: smaller;">
                ${mostRecentServerResponse(state.log)}
              </span>
            </output>
            
          </div>
          <button>Send</button>
        </form>
      </article>
      
    </main>
  `;
}

function field(name, value, placeholder, oninput, type = 'text') {
  return choo.view`
    <label style=${styles.field}>${name}
      <input name=${name} 
        type=${type}
        placeholder=${placeholder} 
        style="
          width: 100%; 
          font-size: 1.5em;"
        value=${value}
        oninput=${oninput}/>
    </label>
  `;
}

function recent(state) {
  const unique = state.log.reduce(function(prev, val, i, arr) {
    const next = {};
    // increment the count
    next[val.cmd] = 1 + prev[val.cmd] || 0;
    return Object.assign({}, prev, next);
  }, {});

  // TODO sort by count

  return Object.keys(unique)
    .map(val => choo.view`<li>/${val}</li>`);
}

function mostRecentServerResponse(log) {
  //console.dir(log);
  const recent = log.slice(-1)[0];
  return recent ? recent.res : 'Hi there!';
}