// event listener constants
const EVENTS = {
    GAME_STATE: "game_state"
}

// game life cycle states
const GAME_LIFECYCLE_STATE = {
    DOTA_GAMERULES_STATE_INIT: "DOTA_GAMERULES_STATE_INIT",
    DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD: "DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD",
    DOTA_GAMERULES_STATE_STRATEGY_TIME: "DOTA_GAMERULES_STATE_STRATEGY_TIME",
    DOTA_GAMERULES_STATE_TEAM_SHOWCASE: "DOTA_GAMERULES_STATE_TEAM_SHOWCASE",
    DOTA_GAMERULES_STATE_PRE_GAME: "DOTA_GAMERULES_STATE_PRE_GAME",
    DOTA_GAMERULES_STATE_GAME_IN_PROGRESS: "DOTA_GAMERULES_STATE_GAME_IN_PROGRESS",
    DOTA_GAMERULES_STATE_POST_GAME: "DOTA_GAMERULES_STATE_POST_GAME"
}

// relevant data to render per section
const GAME_STATE_RENDER_PROPERTIES = {
    //add more based off the game state
    hero: ["level", "xp", "alive", "respawn_seconds", "buyback_cost", "buyback_cooldown", "health", "mana", "silenced", "stunned", "disarmed", "magicimmune", "hexed", "muted", "break", "aghanims_scepter", "aghanims_shard", "smoked", "has_debuff" ],
    player: ["kills", "deaths", "assists", "last_hits", "denies", "kill_streak", "gold", "gold_reliable", "gold_unreliable", "gold_from_hero_kills", "gold_from_creep_kills", "gold_from_income", "gold_from_shared", "gpm", "xpm" ],
    map: ["game_time", "clock_time", "daytime", "nightstalker_night", "radiant_score", "dire_score", "ward_purchase_cooldown"]
}