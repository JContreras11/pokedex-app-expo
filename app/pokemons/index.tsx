import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	Image,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { getPokemons, getPokemonById } from "../../store/sagas/pokemon";
import { types } from "../../store/Pokemon";
import { StoreContext } from "../../store/StoreProvider";
import Nav from "@/components/shared/Nav";
import { GradientText } from "universal-gradient-text";
import { bg } from "@/assets/Media";
import { Feather } from "@expo/vector-icons";


const Index = () => {
	const [store, dispatch] = useContext(StoreContext);
	const [loadingPokemon, setLoadingPokemon] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchPokemons = async () => {
			try {
				const pokemonsData = await getPokemons();
				dispatch({ type: types.getPokemons, payload: pokemonsData });
			} catch (error) {
				console.error("Error al obtener los Pokémon:", error);
			}
		};

		fetchPokemons();
	}, []);
	
	const setPokemon = (pokemon: PokemonList) => {
		setLoadingPokemon(pokemon.name);
		getPokemonById(pokemon.name).then((res) => {
			dispatch({ type: types.getPokemonById, payload: res });
			setLoadingPokemon(null);
			router.push("/pokemons/stats");
		});
	};

	const filteredPokemons = store?.pokemons?.results?.filter((pokemon: PokemonList) =>
		pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			<Image
				source={bg}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					resizeMode: "cover",
					zIndex: -1,
					backgroundColor: "#000",
				}}
			/>
			<View style={styles.container}>
				<Nav />
				{/* Header */}
				<View style={styles.header}>
					<GradientText
						style={styles.title}
						colors={["#FFFFFF", "#FFFFFF80", "#FFFFFFB0", "#FFFFFF80"]}
						direction="rtl"
					>
						What Are You Looking For?
					</GradientText>
				</View>

				{/* Search Bar */}
				<View style={styles.searchBarContainer}>
					<Feather name="search" size={20} color="#7E7E7E" />
					<TextInput
						style={styles.searchBar}
						placeholder="Search"
						placeholderTextColor="#888"
						value={searchTerm}
						onChangeText={setSearchTerm}
					/>
				</View>

				{/* Pokémon Grid */}
				<ScrollView contentContainerStyle={styles.contentContainer}>
					{filteredPokemons?.map((pokemon: PokemonList, index: number) => {						
						return (
							<PokemonCard
								key={pokemon.name || index}
								name={pokemon.name}
								image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/").slice(0, -1).pop()}.png`}								
								onPress={() => setPokemon(pokemon)}
								isLoading={loadingPokemon === pokemon.name}
							/>
						);
					})}
				</ScrollView>
			</View>
		</>
	);
};


type PokemonTheme = {
  background: string;
  detail: string;
  platform: "ios" | "android";
  primary: string;
  secondary: string;
};


const PokemonCard = ({
	name,
	image,
	backgroundColor,
	onPress,
	isLoading,
}: {
	name: string;
	image: string;
	backgroundColor?: PokemonTheme;
	onPress: () => void;
	isLoading: boolean;
}) => (
	<TouchableOpacity
		style={[styles.pokemonCard]}
		onPress={onPress}
		disabled={isLoading}
	>
		<>
			<Image source={{ uri: image }} style={styles.pokemonImage} />
			<View style={styles.cardContent}>
				<Text style={styles.pokemonName}>{name}</Text>
				<View style={styles.arrowContainer}>
					{isLoading ? (
						<ActivityIndicator size="large" color="#fff" />
					) : (
						<Text style={styles.arrow}>➔</Text>
					)}
				</View>
			</View>
		</>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	cardContent: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	arrowContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	contentContainer: {
		paddingTop: 20,
		paddingBottom: 100,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: "space-between",
		gap: 10,
	},
	container: {
		paddingTop: 50,
		flex: 1,
		backgroundColor: "transparent",
		paddingHorizontal: 16,
	},
	header: {
		marginTop: 30,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	title: {
		fontSize: 34,
		fontWeight: "bold",
		width: "80%",
	},
	searchBarContainer: {
		marginTop: 16,
		backgroundColor: "#333",
		borderRadius: 50,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
	},
	searchBar: {
		backgroundColor: "transparent",
		borderWidth: 0,
		color: "#fff",
		fontSize: 16,
		marginLeft: 10,
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		marginTop: 16,
		gap: 16,
	},
	pokemonCard: {
		width: "48%",
		padding: 16,
		borderRadius: 10,
		justifyContent: "space-between",
		alignItems: "center",
	},
	pokemonImage: {
		width: 140,
		height: 140,
	},
	pokemonName: {
		fontSize: 16,
		color: "#fff",
		fontWeight: "bold",
		marginTop: 8,
		textTransform: "capitalize",
	},
	arrow: {
		fontSize: 24,
		color: "#fff",
		marginTop: 8,
	},
	// ... (otros estilos existentes)
});

export default Index;
