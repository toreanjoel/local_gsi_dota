/****** Init *****/
(function(){
	socket_setup();
})()



/****** Socket methods *****/
function socket_setup() {
	// this needs to be removed below and point to the current node server
	var socket = io("https://192.168.1.117:7000/");
	socket.on(EVENTS.GAME_STATE, (data) => {
		const { gamestate } = data;
		if (!gamestate) return;

		render_user_details(gamestate)
		render_hero(gamestate);
	})
}

/****** lifecycle methods *****/

// check game state relevant
// used to know if we should render the live gamestate
// based on game type and user game type
function check_game_state() {

}

// get the assets needed for the current user and all their meta data
function preload_assets() {

}

// get the saved widgets the user added to their state
function get_persisted_widgets() {

}

// render the hero
function render_hero() {
	const { hero } = gamestate;
	if (!hero) return;
	const hero_dom = document.querySelector(".hero");
	const hero_animation_src_dom = document.querySelector('.hero_animation_source')
	const hero_animation_img_dom = document.querySelector('.hero_animation_img')
	if (!hero_dom) return;
	if (!hero_animation_src_dom) return;
	if (!hero_animation_img_dom) return;

	// get hero name
	const hero_name = hero.name.replace("npc_dota_hero_", "")
	hero_dom.innerHTML = hero_name

	// update the player renderer
	hero_animation_src_dom.setAttribute("src", `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${hero_name}.webm`)
	hero_animation_img_dom.setAttribute("src", `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${hero_name}.png`)
}

// render hero abilities and stats
function render_hero_stats_abilities() {

}

// render the widgets if there is
function render_widgets() {

}

// add widgets modal?
// button that will be pressed to open the widget options
function add_widget() {
	console.log("showing widgets avail")
}

// render the user information off the payload
function render_user_details(gamestate) {
	const { player } = gamestate;
	if (!player) return;
	const user_dom = document.querySelector(".user");

	if (!user_dom) return;
	user_dom.innerHTML = player.name
}