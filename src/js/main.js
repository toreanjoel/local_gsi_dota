/****** Init *****/
(function(){
    socket_setup();
    check_game_state();
    preload_assets();
    get_persisted_widgets();
    render_hero();
})()



/****** Socket methods *****/
function socket_setup() {
    // this needs to be removed below and point to the current node server
    var socket = io("https://192.168.1.117:7000/");
    socket.on(EVENTS.GAME_STATE, (data) => {
        document.getElementById("data").innerHTML = JSON.stringify(data.gamestate, null, 2);
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
    render_hero_stats_abilities();
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