### Description
This is a simple webinterface for Minecraft Server. It gives the commands "START", "STOP" and "RESTART".

### License
Feel free to use on your own server, wheatver a private or a comercial use. Even feel free to change / improve this code and spread with the world, as long as the code will be open source.

### Requirements
1. Screen
2. Node.js
3. SSH-Access (root access not needed(!), if Screen and Node.js already installed)

### How to install and configure
1. Download the "server startup script" (http://www.minecraftwiki.net/wiki/Tutorials/Server_startup_script#Script). Its used as interface between this webinterface and the minecraft server (I didn't wanted to develop my own script).
2. Configure the "settings" part in the top of the shell script.
3. Rename the shell script as >>mcscript.sh<<. U don't need to run it as daemon over init.d or somethings else. 
4. Install Screen and Node.js if not already installed.
5. Change in the script.js the settings for Security-Token (should be at least a 128bit strong random key), ip-adress and port (the port you would like).
6. Change the placeholders in the top of >>file.html<<
7. If you prefer a german webinterface, rename the fileGER.html to file.html (and delete the old file.html).
8. start the script with >>node script.js<< (maybe with screen)

### Infos
The webinterface, the server startup script and the minecraft server have to run on the same shell-account!

### How to use
1. Open the interface over {ip-adress}:{port}/{security-token}.
2. Page has three buttons: START, STOP, RESTART. Simple click on it. (But wait, actions may need up to 60secs!)
3. For doing a second action (like a manual restart with first stop and then start) reload the page! (This is, for being sure, there isn't an uncrontrolled queue.)