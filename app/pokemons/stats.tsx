import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	ProgressBarAndroid,
} from "react-native";
import { StoreContext } from "../../store/StoreProvider";


const StackStats = () => {
	const [store] = useContext(StoreContext);
	const selectedPokemon: Pokemon = store.selectedPokemon;	

	if (!selectedPokemon || Object.keys(selectedPokemon).length === 0) {
		return (
			<ScrollView contentContainerStyle={[styles.container, { paddingBottom: 80, backgroundColor: "#000" }]}>
				<Text style={styles.loadingText}>No se ha seleccionado ningún Pokémon</Text>
			</ScrollView>
		);
	}

	return (
		<ScrollView contentContainerStyle={[styles.container, { paddingBottom: 80, backgroundColor: "#000" }]}>
			{/* Header with Back and Heart Icons */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => {
					router.back();
				}}>
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
					<Text style={styles.tabText}>ABOUT</Text>
					<Text style={[styles.tabText, styles.activeTab]}>STATS</Text>
					<Text style={styles.tabText}>MOVES</Text>
					<Text style={styles.tabText}>EVOLUTIONS</Text>
				</View>

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
			</View>
		</ScrollView>
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

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,		
		paddingHorizontal: 16,
		paddingTop: 50,
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
});

export default StackStats;
