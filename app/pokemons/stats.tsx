import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import { StoreContext } from "../../store/StoreProvider";
import PokemonSearch from "@/components/shared/Evolutions";
import { water_bg, default_bg, fire_bg, grass_bg } from "@/assets/Media";

const StackStats = () => {
	const [store] = useContext(StoreContext);
	const selectedPokemon: Pokemon = store.selectedPokemon;
	const [activeTab, setActiveTab] = useState("STATS");

	if (!selectedPokemon || Object.keys(selectedPokemon).length === 0) {
		return (
			<ImageBackground source={default_bg} style={styles.container}>
				<Text style={styles.loadingText}>No se ha seleccionado ningún Pokémon</Text>
			</ImageBackground>
		);
	}

	// Obtener la imagen de fondo basada en el tipo del Pokémon
	const getBackgroundImage = () => {
		const type = selectedPokemon.types[0].type.name;
		switch (type) {
			case 'water':
				return water_bg;
			case 'fire':
				return fire_bg;
			case 'grass':
				return grass_bg;
			default:
				return default_bg;
		}
	};

	const renderTabContent = () => {
		switch (activeTab) {
			case "ABOUT":
				return (
					<View style={styles.tabContent}>
						<Text style={styles.aboutText}>Altura: {selectedPokemon.height / 10} m</Text>
						<Text style={styles.aboutText}>Peso: {selectedPokemon.weight / 10} kg</Text>
						<Text style={styles.aboutText}>Tipos: {selectedPokemon.types.map(t => t.type.name).join(", ")}</Text>
						<Text style={styles.aboutText}>Habilidades: {selectedPokemon.abilities.map(a => a.ability.name).join(", ")}</Text>
					</View>
				);
			case "STATS":
				return (
					<View style={styles.stats}>
						{selectedPokemon.stats.map((stat, index) => (
							<StatRow
								key={stat.stat.name}
								name={stat.stat.name}
								value={stat.base_stat}
								color={getStatColor(stat.stat.name)}
							/>
						))}
					</View>
				);
			case "MOVES":
				return (
					<View style={styles.tabContent}>
						{selectedPokemon.moves.slice(0, 10).map((move, index) => (
							<Text key={move.move.name} style={styles.moveText}>
								{move.move.name}
							</Text>
						))}
					</View>
				);
			case "EVOLUTIONS":
				return (
					<View style={styles.evolutionsContainer}>
						<PokemonSearch query={selectedPokemon.name} />
					</View>
				);
			default:
				return null;
		}
	};

	return (
		<ImageBackground source={getBackgroundImage()} style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollViewContent} >
				{/* Header with Back and Heart Icons */}
				<View style={styles.header}>
					<TouchableOpacity onPress={() => router.push("/pokemons")}>
						<Text style={styles.backIcon}>←</Text>
					</TouchableOpacity>
					<Text style={styles.pokemonName}>{selectedPokemon.name}</Text>
					<TouchableOpacity>
						<Text style={styles.heartIcon}>♡</Text>
					</TouchableOpacity>
				</View>

				{/* Pokemon Image */}
				<View style={styles.imageContainer}>
					<Image source={{ uri: selectedPokemon.sprites.front_default || "" }} style={styles.pokemonImage} />
				</View>

				{/* Stats Section */}
				<View style={styles.statsContainer}>
					<View style={styles.tabs}>
						{["ABOUT", "STATS", "MOVES", "EVOLUTIONS"].map((tab) => (
							<TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
								<Text style={[styles.tabText, activeTab === tab && styles.activeTab]}>{tab}</Text>
							</TouchableOpacity>
						))}
					</View>

					{renderTabContent()}
				</View>
			</ScrollView>
		</ImageBackground>
	);
};

const getStatColor = (statName: string): string => {
	switch (statName) {
		case 'hp':
			return 'red';
		case 'attack':
		case 'special-attack':
			return 'orange';
		case 'defense':
		case 'special-defense':
			return 'green';
		case 'speed':
			return 'blue';
		default:
			return 'gray';
	}
};

const StatRow = ({ name, value, color }: { name: string; value: number; color: string }) => (
	<View style={styles.statRow}>
		<Text style={styles.statName}>{name}</Text>
		<Text style={styles.statValue}>{value}</Text>
		<View style={[styles.progressBar, { backgroundColor: color, width: `${value}%` }]} />
	</View>
);

const typeColors = {
	normal: '#A8A878',
	fire: '#F08030',
	water: '#6890F0',
	electric: '#F8D030',
	grass: '#78C850',
	ice: '#98D8D8',
	fighting: '#C03028',
	poison: '#A040A0',
	ground: '#E0C068',
	flying: '#A890F0',
	psychic: '#F85888',
	bug: '#A8B820',
	rock: '#B8A038',
	ghost: '#705898',
	dragon: '#7038F8',
	dark: '#705848',
	steel: '#B8B8D0',
	fairy: '#EE99AC',
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollViewContent: {
		flexGrow: 1,
		paddingHorizontal: 16,
		paddingTop: 50,
		paddingBottom: 80,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 16,
	},
	backIcon: {
		fontSize: 24,
		color: "#000", // Cambiado a negro
	},
	heartIcon: {
		fontSize: 24,
		color: "#000", // Cambiado a negro
	},
	pokemonName: {
		fontSize: 32,
		color: "#000", // Cambiado a negro
		fontWeight: "bold",
		textTransform: "capitalize",
	},
	imageContainer: {
		alignItems: "center",
		marginVertical: 20,
	},
	pokemonImage: {
		width: 250,
		height: 250,
	},
	statsContainer: {
		backgroundColor: "#222",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		padding: 16,
		paddingTop: 30,
		paddingBottom: 80,
		flex: 1,
		justifyContent: 'flex-start',
	},
	tabs: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	tabText: {
		color: "#888",
		fontSize: 14,
		fontWeight: "bold",
	},
	activeTab: {
		color: "#fff",
	},
	stats: {},
	statRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	statName: {
		flex: 1,
		color: "#fff",
		fontSize: 16,
	},
	statValue: {
		color: "#fff",
		marginRight: 10,
		fontSize: 16,
		fontWeight: "bold",
	},
	progressBar: {
		flex: 2,
		height: 8,
		borderRadius: 4,
	},
	bottomNav: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingVertical: 16,
		backgroundColor: "#222",
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
	},
	navIcon: {
		width: 40,
		height: 40,
	},
	loadingText: {
		color: '#fff',
		fontSize: 18,
		textAlign: 'center',
		marginTop: 50,
	},
	tabContent: {
		marginTop: 20,
	},
	aboutText: {
		color: '#fff',
		fontSize: 16,
		marginBottom: 10,
	},
	moveText: {
		color: '#fff',
		fontSize: 16,
		marginBottom: 5,
	},
	evolutionsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		marginTop: 20,
	},
	evolutionItem: {
		alignItems: 'center',
		marginBottom: 20,
	},
	evolutionImage: {
		width: 100,
		height: 100,
	},
	evolutionName: {
		color: '#fff',
		fontSize: 16,
		marginTop: 5,
	},
});

export default StackStats;
