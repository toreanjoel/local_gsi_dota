/****** Init *****/
(function(){
	socket_setup();
})()



/****** Socket methods *****/
function socket_setup() {
	// this needs to be removed below and point to the current node server
	var socket = io();
	socket.on(EVENTS.GAME_STATE, (data) => {
		const { gamestate } = data;
		if (!gamestate) return;

		const { map } = gamestate
		// reset the app if there is no map state
		if (!map) reset_game();
		// start rendering the game lifecycle
		const game_state = map && map.game_state;
		if (!game_state) return;
		switch (game_state) {
			case GAME_LIFECYCLE_STATE.DOTA_GAMERULES_STATE_INIT:
				// init setup
				const { player } = gamestate;
				render_user_details(player)
				break;
			case GAME_LIFECYCLE_STATE.DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD:
				// players loading
			case GAME_LIFECYCLE_STATE.DOTA_GAMERULES_STATE_HERO_SELECTION:
				// hero selection before selection
				break;
			case GAME_LIFECYCLE_STATE.DOTA_GAMERULES_STATE_STRATEGY_TIME:
				// before start buying items
				const { hero } = gamestate;
				render_hero(hero);
				break;
			case GAME_LIFECYCLE_STATE.DOTA_GAMERULES_STATE_TEAM_SHOWCASE:
				// loading the game of the team
				break;
			case GAME_LIFECYCLE_STATE.DOTA_GAMERULES_STATE_PRE_GAME:
				// count down before game start (before creeps spawn)
				break;
			case GAME_LIFECYCLE_STATE.DOTA_GAMERULES_STATE_GAME_IN_PROGRESS:
				// game!
				break;
			case GAME_LIFECYCLE_STATE.DOTA_GAMERULES_STATE_POST_GAME:
				// end game
				break;
		
			default:
				// default empty state, clear everyhing here between games
				// consider using the prev game state details to show?
				break;
		}
	})
}

// reset the app state between game lifecycle
function reset_game() {
	const hero_dom = document.querySelector(".hero");
	const hero_animation_src_dom = document.querySelector('.hero_animation_source')
	const hero_animation_img_dom = document.querySelector('.hero_animation_img')
	const hero_animation_poster_dom = document.querySelector('.hero_animation')
	const user_dom = document.querySelector(".user");

	if (!hero_dom) return;
	if (!hero_animation_src_dom) return;
	if (!hero_animation_poster_dom) return;
	if (!hero_animation_img_dom) return;

	// get hero name
	hero_dom.innerHTML = ""

	// update the player renderer
	hero_animation_src_dom.setAttribute("src", "")
	hero_animation_img_dom.setAttribute("src", "")
	hero_animation_poster_dom.setAttribute("poster", "")
	hero_animation_poster_dom.setAttribute("src", "")

	// reset player details
	user_dom.innerHTML = ""
}

// render the hero
function render_hero(hero) {
	if (!hero) return;
	const hero_dom = document.querySelector(".hero");
	const hero_animation_src_dom = document.querySelector('.hero_animation_source')
	const hero_animation_img_dom = document.querySelector('.hero_animation_img')
	const hero_animation_poster_dom = document.querySelector('.hero_animation')
	if (!hero_dom) return;
	if (!hero_animation_src_dom) return;
	if (!hero_animation_poster_dom) return;
	if (!hero_animation_img_dom) return;

	// get hero name
	const hero_name = hero.name.replace("npc_dota_hero_", "")
	hero_dom.innerHTML = hero_name

	// update the player renderer
	hero_animation_src_dom.setAttribute("src", `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${hero_name}.webm`)
	hero_animation_img_dom.setAttribute("src", `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${hero_name}.png`)
	hero_animation_poster_dom.setAttribute("poster", `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${hero_name}.png`)
	hero_animation_poster_dom.setAttribute("src", `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${hero_name}.webm`)
}

// render the user information off the payload
function render_user_details(player) {
	if (!player) return;
	const user_dom = document.querySelector(".user");

	if (!user_dom) return;
		user_dom.innerHTML = player.name
}

// render the widgets if there is
function render_widgets() {

}