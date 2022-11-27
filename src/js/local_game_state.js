class LocalGameState {
	constructor(state = {}) {
		const { player_details, hero_details, map_details, dom_reset} = state;

		this.state = {
			player_details: player_details ?? false,
			hero_details: hero_details ?? false,
			map_details: map_details ?? false,
			dom_reset: dom_reset ?? true
		}
	}

	// get the current state of the local game state
	getState() {
		return this.state;
	}

	// set the new state of the local game state
	setState(state) {
		if (!state) return;
		const {player_details, hero_details, map_details, dom_reset } = state
		this.state = {
			player_details: player_details,
			hero_details: hero_details,
			map_details: map_details,
			dom_reset: dom_reset
		}
	}
}