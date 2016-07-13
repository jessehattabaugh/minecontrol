const choo = require('choo');
const styles = require('./styles');

const $ = document.querySelector.bind(document);

const cmds = require('./commands');

module.exports = view;

function view(params, state, send) {

  function exec(ev) {
    ev.preventDefault();
    send('exec');
  }

  return choo.view`
    <main id="app" style="
      ${styles.container} 
      display: flex; 
      flex-direction: column;
    ">
      <header style="${styles.grass}">
        <div style="${styles.spread}">
          <button 
              style=${styles.button} 
              onclick=${() => send('settings')}>
            ⚙
          </button>
          <h1 style="font-size: large; margin: 0">⛏Minecontrol</h1>
          <button 
            style=${styles.button} 
            onclick=${() => send('history')}>
            ⌘<
          /button>
        </div>
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
        <button 
          style=${styles.button}
          onclick=${() => send('history')}>
          Close
        </button>
      </aside>
      
      <article style="flex: 1 1; overflow-y: auto;">
      
        <ol style="
          list-style: none;
          padding: 0;
        ">
          ${Object.keys(cmds).map((cmd, i, data) => choo.view`
            <li style="padding: .5em;" onclick=${ev => send('cmd', {val: cmd})}>
              ${cmd}
              ${args(state, cmd, data)}
            </li>
          `)}
        </ol>
      </article>
      
      <form onsubmit=${exec}
        style="
        display: flex; 
        width: 100%;
        margin: 0;
      ">
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
          
          <output onclick=${ev => $('input[name=cmd]').focus()}
          style="${styles.io}
            color: grey;
            border-top: none;
          ">
            <span style="font-size: smaller;">
              ${mostRecentServerResponse(state.log)}
            </span>
          </output>
          
        </div>
        <button style=${styles.button}>Send</button>
      </form>
      
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
  return recent && recent.res ? recent.res : '...';
}

function args(state, cmd, data) {
  if (state.cmd == cmd && data.args) {
    return choo.view`
      <ol>
        ${data.args.map(function (arg, i, argData) {
          return choo.view`
            <li>${arg}</li>
          `;
        })}
      </ol>
    `;
  }
}