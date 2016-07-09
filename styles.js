exports.panel = `
  position: absolute;
  width: 90%;
  padding: 1em;
  background: #ccc;
  transition-property: left, right;
  transition-duration: .5s;
  transition-timing-function: ease-in-out;
  box-shadow: 0 .25em 1em rgba(0,0,0,.5);
`;
  
exports.container = `
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background: white;
`;

exports.spread = `
  display: flex; 
  justify-content: space-between;
`;

exports.grass = `
  background: linear-gradient(lime, green);
`;

exports.field = `
  display: block; 
  margin-bottom: 1em; 
  text-transform: capitalize;
`;
  
exports.io = `
  display: block;
  width: 100%;
  background: black;
  color: white;
  border: .25em inset silver;
  font-size: 1em;
  padding: .25em;
  outline: none;
`;