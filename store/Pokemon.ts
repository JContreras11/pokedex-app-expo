import React from "react";

const types = {
	getPokemons: "GET_POKEMONS",
	getPokemonById: "GET_POKEMON_BY_ID",
};

const PokemonReducer = (state, action) => {
	switch (action.type) {
		case types.getPokemons:
			return {
				...state,
				pokemons: action.payload,
			};
		case types.getPokemonById:
			return {
				...state,
				selectedPokemon: action.payload,
			};
		default:
			return state;
	}
};

export { PokemonReducer, types };
