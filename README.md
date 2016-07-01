# Minecontrol

A web app that can send commands to a Minecraft server.

[Hosted on Now.js](https://minecontrol-xoesdobhkj.now.sh/)

## Configuring Minecraft Server to use sRcon

Minecraft Server can use a protocol called rcon to allow admins to execute commands remotely. This must be turned on for Minecontrol to work. To enable this feature the admin must set `enable-rcon=true` and `rcon.password=YOUR_PASSWORD` in the server's `server.properties` configuration file. Anyone who has the password will be able to execute commands as /op, so the password should be kept secret.