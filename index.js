// dota gsi
const d2gsi = require('dota2-gsi');
// steam path setup
const { getGamePath } = require('steam-game-path')
// fs
const fs = require("fs");
// constants
const { 
  GSI_SERVER_PORT, 
  WEB_SERVER_PORT,
  GSI_CFG_FILE,
  GSI_PATH,
  GSI_TEMPLATE
} = require('./constants')
// events constants
const { 
  SOCKET_EVENT, 
  GAME_EVENT,
  GAME_DATA_FREQ
} = require('./events')

// express
const express = require('express');
const app = express();
const http = require('http');
const express_server = http.createServer(app);
// socket io
const { Server } = require("socket.io");
const io = new Server(express_server);

/******************************* Init setup ******************************* */
const dotaClientServer = new d2gsi({
  port: GSI_SERVER_PORT
});

// init the app and check if it managed to make all the files an folders first
if (!find_steam_library_paths()) return console.log("There was an issue creating the config files")
setup_root_route();
start_web_server();

/******************************* HELPER FUNCTIONS - start *******************************  */

/**
 * Start the node web server
 */
function start_web_server() {
  express_server.listen(WEB_SERVER_PORT, () => {
    console.log(`Application listening on port ${WEB_SERVER_PORT}`);
    /******************************* client connection to socket ******************************* */
    io.on(SOCKET_EVENT.connection, (_socket) => {
      // start game server listener for the connected user
      game_event_listener(_socket);
      // add other listeners here for the client app and the server
    });
  });
}

/**
 * setup the route route / of the application and the index file path to render
 */
function setup_root_route() {
  app.get('/', (_, res) => {
    res.sendFile(__dirname + '/src/index.html');
  });
}

/**
 * Check the existence of the GSI config file
 * @returns bool
 */
function check_GSI_exists(gsi_path_in_steam) {
  return fs.existsSync(`${gsi_path_in_steam}\\${GSI_CFG_FILE}`);
}

/**
 * Copy over the GSI template to the relevant directory for the client
 */
function copy_GSI_template(gsi_path_in_steam) {
  fs.copyFile(
    __dirname + GSI_TEMPLATE,
    `${gsi_path_in_steam}\\${GSI_CFG_FILE}`,
    fs.constants.COPYFILE_EXCL,
    (err) => err
  );
}

/**
 * Create the directory where the cfg files will house
 * @param {*} directory 
 */
function create_GSI_directory(directory) {
  fs.mkdir(directory, (err) => err);
}

/**
 * find teh steam path and check if the config path exists - create otherwise
 */
function find_steam_library_paths() {
  const { steam } = getGamePath();
  if (!steam) return false;
  if (!steam.libraries) return false;
  // loop over libraries
  const libraries = steam.libraries;
  libraries.forEach((lib_path) => {
    const gsi_path = `${lib_path}${GSI_PATH}`
    // try access the directory
    // NOTE: WILL ADD TO ALL INSTANCES OF STEAM APPS
    if (!check_GSI_exists(gsi_path)) {
      //create the folders and file
      create_GSI_directory(gsi_path)
    }
    copy_GSI_template(gsi_path);
  })
  return true
}

/**
 * The function that will start opening up the listener for the game events
 */
function game_event_listener(_socket) {
  // connected clients - will be used for the GSI
  const clients = [];
  // game server listener
  dotaClientServer.events.on(GAME_EVENT.new_client, (client) => {
    // game client opens and push to array of clients
    console.log(client)
    clients.push(client);
  });

  // loop over each client connected to the dota server - client == instances of current user
  setInterval(() => {
    clients.forEach((client, _index) => {
      console.log(client.gamestate)
      io.emit(SOCKET_EVENT.game_state, client)
    });
  }, GAME_DATA_FREQ); // Every 5 seconds
}

/******************************* HELPER FUNCTIONS - end *******************************  */