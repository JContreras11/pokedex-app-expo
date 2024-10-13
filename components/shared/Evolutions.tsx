import { StoreContext } from "@/store/StoreProvider";
import React, { useState, useEffect, useContext } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	ActivityIndicator,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { getPokemonById } from "../../store/sagas/pokemon";
import { types } from "../../store/Pokemon";

interface PokemonSearchProps {
	query: string;
}

const PokemonSearch: React.FC<PokemonSearchProps> = ({ query }) => {
	const [pokemon, setPokemon] = useState<PokemonList | null>(null);
	const [evolutions, setEvolutions] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
    const [store, dispatch] = useContext(StoreContext);
    const [loadingPokemon, setLoadingPokemon] = useState<string | null>(null);

	useEffect(() => {
		if (query) {
			fetchPokemon();
		}
	}, [query]);

    const setPokemonRoute = (pokemon: PokemonList) => {
		setLoadingPokemon(pokemon.name);
		getPokemonById(pokemon.name).then((res) => {
			dispatch({ type: types.getPokemonById, payload: res });
			setLoadingPokemon(null);
		});
	};

	// Función para buscar los datos del Pokémon
	const fetchPokemon = async () => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`,
			);
			if (!response.ok) throw new Error("Pokémon not found!");
			const data = await response.json();
			setPokemon(data);
			fetchEvolutionChain(data.species.url); // Buscar la cadena evolutiva
		} catch (err: any) {
			setError(err.message);
			setPokemon(null);
			setEvolutions([]);
		} finally {
			setLoading(false);
		}
	};

	// Función para buscar la cadena evolutiva
	const fetchEvolutionChain = async (speciesUrl: string) => {
		try {
			const speciesResponse = await fetch(speciesUrl);
			const speciesData = await speciesResponse.json();
			const evolutionChainUrl = speciesData.evolution_chain.url;

			const evolutionResponse = await fetch(evolutionChainUrl);
			const evolutionData = await evolutionResponse.json();

			const evoChain = extractEvolutions(evolutionData.chain);
			setEvolutions(evoChain);
		} catch (err) {
			console.error("Error fetching evolution chain:", err);
		}
	};

	// Función para extraer evoluciones en forma de array
	const extractEvolutions = (chain: any): any[] => {
		const evolutionsList: any[] = [];
		let current = chain;

		while (current) {
			const pokemonData = store?.pokemons?.results?.find(
				(pokemon: PokemonList) => pokemon.name === current.species.name
			);
            
            
			const pokemonId = pokemonData?.url.split("/").slice(0, -1).pop();
                    
			evolutionsList.push({
				name: current.species.name,
				url: `https://pokeapi.co/api/v2/pokemon/${current.species.name}`,
				image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
			});

			current = current.evolves_to[0]; // Continuar con la siguiente evolución
		}
		return evolutionsList;
	};

	// Renderizado de cada evolución
	const renderEvolution = ({ item }: { item: any }) => (
		<TouchableOpacity onPress={() => setPokemonRoute(item)}>
			<View style={styles.evolutionItem}>
				{loadingPokemon === item.name && (
					<ActivityIndicator size="small" color="#fff" />
				)}
				<Text style={styles.name}>{item.name.toUpperCase()}</Text>
				<Image
					source={{
						uri: item.image,
					}}
					style={styles.image}
				/>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			{loading && <ActivityIndicator size="large" color="#0000ff" />}
			{error && <Text style={styles.error}>{error}</Text>}		
			{evolutions.length > 0 && (
				<FlatList
					data={evolutions}
					keyExtractor={(item) => item.name}
					renderItem={renderEvolution}
					style={styles.evolutionList}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
	},
	pokemonInfo: {
		alignItems: "center",
	},
	name: {
		fontSize: 20,
		fontWeight: "bold",
        color: "#fff"
	},
	image: {
		width: 150,
		height: 150,
		marginTop: 10,
	},
	error: {
		color: "red",
		marginTop: 10,
	},
	evolutionList: {
	},
	evolutionItem: {
		alignItems: "center",
		marginBottom: 10,
	},
});

export default PokemonSearch;
