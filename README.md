# minecontrol

A web app that can send commands to a minecraft server.

## Rcon

Minecraft servers can be configured to accept rcon connections. Rcon is a socket protocol. As such many Node.js packages for doing rcon do not work in the browser. 

The plan is to run a simple http server that executes rcon commands on behalf of the client. My first attempts using simple-rcon and express could execute commands successfully, but the connection seemed to immediately disconnect. That makes me think there's little point 