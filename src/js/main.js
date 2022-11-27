/****** Init *****/
(function () {
	let liveGameState = new LocalGameState()
	socket_setup(liveGameState);
})()

/****** Socket methods *****/
function socket_setup(state) {
	// this needs to be removed below and point to the current node server
	var socket = io();
	socket.on(EVENTS.GAME_STATE, (data) => {
		const { gamestate } = data;
		if (!gamestate) return;

		const { map } = gamestate
		// start rendering the game lifecycle
		const game_state = map && map.game_state;
		// reset the game with no state
		if (!game_state) {
			const { dom_reset } = state.getState()
			if (!dom_reset) {
				reset_state();
				// reset the class state
				state.setState({
					dom_reset: true,
					player_details: false,
					hero_details: false,
					map_details: false
				})
			}
			return;
		};

		switch (game_state) {
			case GAME_LIFECYCLE_STATE.DOTA_GAMERULES_STATE_INIT:
				// init setup
				state.setState({
					dom_reset: false
				});
				break;
			case GAME_LIFECYCLE_STATE.DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD:
				// players loading
			case GAME_LIFECYCLE_STATE.DOTA_GAMERULES_STATE_HERO_SELECTION:
				// hero selection before selection
				const { player_details } = state.getState()
				if (!player_details) {
					const { player } = gamestate;
					render_user_details(player)
					state.setState({
						player_details: true
					});
				};
				break;
			case GAME_LIFECYCLE_STATE.DOTA_GAMERULES_STATE_STRATEGY_TIME: {
				const { hero_details, player_details } = state.getState()
				if (!hero_details || !player_details) {
					const { player, hero } = gamestate;
					render_user_details(player)
					render_hero(hero);
					state.setState({
						player_details: true,
						hero_details: true
					});
				};
				break;
			}
			case GAME_LIFECYCLE_STATE.DOTA_GAMERULES_STATE_TEAM_SHOWCASE:
				// loading the game of the team
				break;
			case GAME_LIFECYCLE_STATE.DOTA_GAMERULES_STATE_PRE_GAME: {
				// count down before game start (before creeps spawn)
				// make sure to re render the player and hero if not rendered
				const { player, hero, map } = gamestate;
				const { hero_details, player_details } = state.getState()
				if (!hero_details || !player_details) {
					render_user_details(player)
					render_hero(hero);
					state.setState({
						player_details: true,
						hero_details: true
					});
				};

				const card_widget_parent = document.querySelector('.card-widgets')
				// first clear before rerendering
				card_widget_parent.innerHTML = '';
				// render data
				render_player_data(player);
				render_hero_data(hero);
				render_map_data(map);
				break;
			}
			case GAME_LIFECYCLE_STATE.DOTA_GAMERULES_STATE_GAME_IN_PROGRESS: {
				// game!
				const { player, hero, map } = gamestate;
				const { hero_details, player_details } = state.getState()
				if (!hero_details || !player_details) {
					render_user_details(player)
					render_hero(hero);
					state.setState({
						player_details: true,
						hero_details: true
					});
				};

				const card_widget_parent = document.querySelector('.card-widgets')
				// first clear before rerendering
				card_widget_parent.innerHTML = '';
				// render data
				render_player_data(player);
				render_hero_data(hero);
				render_map_data(map);
				break;
			}
			case GAME_LIFECYCLE_STATE.DOTA_GAMERULES_STATE_POST_GAME:
				// end game - post game score
				break;
		
			default:
				// default empty state, clear everyhing here between games
				// consider using the prev game state details to show?
				break;
		}
	})
}

// reset the app state between game lifecycle
function reset_state() {
	const hero_dom = document.querySelector(".card-character-name");
	const hero_animation_src_dom = document.querySelector('.hero_animation_source')
	const hero_animation_img_dom = document.querySelector('.hero_animation_img')
	const hero_animation_poster_dom = document.querySelector('.hero_animation')
	const user_dom = document.querySelector(".card-player-name");
	const widgets_dom = document.querySelector(".card-widgets");

	// update the player renderer
	hero_animation_src_dom.setAttribute("src", "")
	hero_animation_img_dom.setAttribute("src", "")
	hero_animation_poster_dom.setAttribute("poster", "")
	hero_animation_poster_dom.setAttribute("src", "")

	// reset the dom
	hero_dom.innerHTML = ""
	user_dom.innerHTML = ""
	widgets_dom.innerHTML = ""
}

// render the hero
function render_hero(hero) {
	if (!hero) return;
	const hero_dom = document.querySelector(".card-character-name");
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
	// play the animation if possible
	hero_animation_poster_dom.play()
}

// render the user information off the payload
function render_user_details(player) {
	if (!player) return;
	const user_dom = document.querySelector(".card-player-name");

	if (!user_dom) return;
		user_dom.innerHTML = player.name
}


// Render widget sections
function render_map_data(map_data) {
	if (!map_data) return;
	Object.keys(map_data).map(key => {
		const current_item = map_data[key]
		if (!current_item) return;
		if (GAME_STATE_RENDER_PROPERTIES.map.includes(key)) {
			// render widget to the dom
			render_widgets(key, current_item)
		}
	})
}

function render_player_data(player_data) {
	if (!player_data) return;
	Object.keys(player_data).map(key => {
		const current_item = player_data[key]
		if (!current_item) return;
		if (GAME_STATE_RENDER_PROPERTIES.player.includes(key)) {
			// render widget to the dom
			render_widgets(key, current_item)
		}
	})
}

function render_hero_data(hero_data) {
	if (!hero_data) return;
	Object.keys(hero_data).map(key => {
		const current_item = hero_data[key]
		if (!current_item) return;
		if (GAME_STATE_RENDER_PROPERTIES.hero.includes(key)) {
			// render widget to the dom
			render_widgets(key, current_item)
		}
	})
}

// render the widgets if there is
function render_widgets(key, value) {
	if (!key) return;
	if (!value) return;
	
	const card_widget_parent = document.querySelector('.card-widgets')
	// setup widget dom elm
	const widget = document.createElement("div")
	widget.classList.add('widget')
	const widget_title = document.createElement("div")
	widget_title.classList.add('widget-title')
	const widget_details = document.createElement("div")
	widget_details.classList.add('widget-details')
	// setup values for dom elem
	const widget_title_text = document.createTextNode(key)
	const widget_details_text = document.createTextNode(value)
	// setup hierachy of dom elem
	widget_title.append(widget_title_text)
	widget_details.append(widget_details_text)
	widget.append(widget_title)
	widget.append(widget_details)
	card_widget_parent.append(widget)
}