import { PokemonReducer, types as typesPokemon } from "./Pokemon";

const initialStore = {
	pokemons: [],
	selectedPokemon: {},
};

const storeReducer = (state, action) => {
	
	if (Object.values(typesPokemon).indexOf(action.type) >= 0) {
		return PokemonReducer(state, action);
	}

	return state;
};

export { initialStore };
export default storeReducer;