### Description
This is a simple webinterface for Minecraft Server. It gives the commands "START", "STOP" and "RESTART".

### License
Feel free to use on your own server, wheatver a private or a comercial use. Even feel free to change / improve this code and spread with the world, as long as the code will be open source.

### Requirements
1. Screen
2. Node.js
3. SSH-Access (root access not needed(!), if Screen and Node.js already installed)

### How to install and configure
1. Download ... script. Its used as interface between this webinterface and the minecraft server (I didn't wanted to develop my own script).
2. Configure the script as in this readme.
3. Install Screen and Node.js if not already installed.
4. Change in the script.js the settings for Security-Token (should be at least a 128bit strong random key) and port (the port you would like).
5. If you prefer a german webinterface, rename the fileGER.html to file.html (and delete the old file.html).
6. start the script with >>node script.js<< (maybe with screen)

### How to use
1. Open the interface over {ip-adress}:{port}/{security-token}.
2. Page has three buttons: START, STOP, RESTART. Simple click on it. (But wait, actions may need up to 60secs!)
3. For doing a second action (like a manual restart with first stop and then start) reload the page! (This is, for being sure, there isn't an uncrontrolled queue.)