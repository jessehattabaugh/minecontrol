const commands = {
  
  achievement: {
    affects: ['players'],
    args: [
      {
        type: 'text',
        options: ['give', 'take']
      },
      {
        type: 'achievement'
      },
      {
        type: 'target',
        options: ['p']
      }
    ]
  },
  
  ban: {
    affects: ['players'],
    args: [
      {
        type: 'player',
        options: ['give', 'take']
      },
    ]
  },
  
  'ban-ip': {
    affects: ['players']
  },
  
  banlist: {
    affects: ['players']
  },
  
  blockdata: {
    affects: ['blocks']
  },
  
  clear: {
    affects: ['players']
  },
  clone: {
    affects: ['blocks']
  },
  debug: {
    affects: []
  },
  defaultgamemode: {
    affects: ['world']
  },
  deop: {
    affects: ['players']
  },
  difficulty: {
    affects: ['players']
  },
  effect: {
    affects: ['entities', 'players']
  },
  enchant: {
    affects: ['entities', 'players']
  },
  entitydata: {
    affects: ['entities']
  },
  execute: {
    affects: []
  },
  fill: {
    affects: ['blocks']
  },
  gamemode: {
    affects: ['players']
  },
  gamerule: {
    affects: ['world']
  },
  give: {
    affects: ['players']
  },
  help: {
    affects: []
  },
  kick: {
    affects: ['players']
  },
  kill: {
    affects: ['entities', 'players']
  },
  list: {
    affects: []
  },
  me: {
    affects: []
  },
  op: {
    affects: ['players']
  },
  pardon: {
    affects: ['players']
  },
  particle: {
    affects: ['players']
  },
  playsound: {
    affects: ['players']
  },
  publish: {
    affects: ['world']
  },
  replaceitem: {
    affects: ['block', 'entities', 'players']
  },
  'save-all': {
    affects: ['world']
  },
  'save-off': {
    affects: ['world']
  },
  'save-on': {
    affects: ['world']
  },
  say: {
    affects: []
  },
  scoreboard: {
    affects: ['entities', 'players']
  },
  seed: {
    affects: ['world']
  },
  setblock: {
    affects: ['blocks']
  },
  setidletimeout: {
    affects: ['players']
  },
  setworldspawn: {
    affects: ['world']
  },
  spawnpoint: {
    affects: ['players']
  },
  spreadplayers: {
    affects: ['entities', 'players']
  },
  stats: {
    affects: ['blocks', 'entities', 'players']
  },
  stop: {
    affects: ['world']
  },
  stopsound: {
    affects: ['players']
  },
  summon: {
    affects: ['entities']
  },
  teleport: {
    affects: ['entities', 'players']
  },
  tell: {
    affects: ['players']
  },
  tellraw: {
    affects: ['players']
  },
  testfor: {
    affects: ['entities', 'players']
  },
  testforblock: {
    affects: ['blocks']
  },
  testforblocks: {
    affects: ['blocks']
  },
  time: {
    affects: ['world']
  },
  title: {
    affects: ['players']
  },
  toggledownfall: {
    affects: ['world']
  },
  tp: {
    affects: ['entities', 'players']
  },
  trigger: {
    affects: ['players']
  },
  weather: {
    affects: ['world']
  },
  whitelist: {
    affects: ['players']
  },
  worldborder: {
    affects: ['world']
  },
  xp: {
    affects: ['players']
  },
};

console.log(Object.keys(commands).filter(v => commands[v].affects.indexOf('players') !== -1))