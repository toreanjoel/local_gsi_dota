// Socket events
const SOCKET_EVENT = {
  connection: "connection",
  game_state: "game_state"
}

// Game listener events
const GAME_DATA_FREQ = 5 * 1000;
const GAME_EVENT = {
  new_client: "newclient"
}

module.exports = {
  SOCKET_EVENT,
  GAME_EVENT,
  GAME_DATA_FREQ
}