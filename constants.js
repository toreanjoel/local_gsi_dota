/**
 * PORTS
 */
const WEB_SERVER_PORT = 7000;
// This needs to match the port setup on the dota cfg
const GSI_SERVER_PORT = 7001;

/**
 * File paths and directories
 */
const GSI_CFG_FILE = `gamestate_integration_local_gsi_dota.cfg`;
const GSI_PATH = `\\common\\dota\ 2\ beta\\game\\dota\\cfg\\gamestate_integration`;
const GSI_TEMPLATE = `/example_data/gamestate_integration_local_gsi_dota.cfg`;

// export the module data
module.exports = {
  WEB_SERVER_PORT,
  GSI_SERVER_PORT,
  GSI_CFG_FILE,
  GSI_PATH,
  GSI_TEMPLATE
}