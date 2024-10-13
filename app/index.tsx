import { adn, bg, blue_box, fire, green_box, group_1, group_2, group_3, group_4, location, pball1, red_box, yellow_box } from "@/assets/Media";
import Nav from "@/components/shared/Nav";
import { router } from "expo-router";
import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	ScrollView,
	type ImageSourcePropType,
	FlatList,
} from "react-native";
import {GradientText} from "universal-gradient-text";

const Index = () => {
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
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
				nestedScrollEnabled={true}
			>
				<Nav />
				{/* Header */}
				<View style={styles.header}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<GradientText
							style={{ fontWeight: "700", fontSize: 34 }}
							colors={["#FFFFFF", "#FFFFFF80", "#FFFFFFB0", "#FFFFFF80"]}
							direction="rtl"
						>
							Hi! Stanly
						</GradientText>
						<Text style={{ fontWeight: "700", fontSize: 34, marginLeft: 10 }}>
							👋
						</Text>
					</View>
					<Text style={styles.subGreeting}>Welcome Back</Text>
				</View>

				{/* Menu Buttons */}
				<View style={styles.menuRow}>
					<MenuButton title="Pokedex" icon={pball1} backgroundColor="#E91E63" backgroundImage={red_box} />
					<MenuButton title="Moves" icon={fire} backgroundColor="#FF9800" backgroundImage={yellow_box} />
				</View>
				<View style={styles.menuRow}>
					<MenuButton title="Evolution" icon={adn} backgroundColor="#03A9F4" backgroundImage={blue_box} />
					<MenuButton
						title="Locations"
						icon={location}
						backgroundColor="#4CAF50"
						backgroundImage={green_box}
					/>
				</View>

				<Text style={styles.sectionTitle}>Live Battle</Text>
				<ScrollView horizontal>
					<BattleCard image={group_1} viewers={568} />
					<BattleCard image={group_2} viewers={64} />
				</ScrollView>

				<Text style={styles.sectionTitle}>Upcoming Battle</Text>
				<ScrollView horizontal>
					<BattleCard image={group_3} viewers={568} />
					<BattleCard image={group_4} viewers={64} />
				</ScrollView>

			</ScrollView>
		</>
	);
};

const MenuButton = ({
	title,
	icon,
	backgroundColor,
	backgroundImage,
}: {
	title: string;
	icon: ImageSourcePropType;
	backgroundColor: string;
	backgroundImage: ImageSourcePropType;
}) => (
	<View style={{ flex: 1, gap: 10 }}>
		<TouchableOpacity
			style={[styles.menuButton, { backgroundColor }]}
			onPress={() => {
				router.push("/pokemons");
			}}
		>
			<Text style={styles.menuText}>{title}</Text>
			<Image source={icon} style={styles.menuIcon} />
		</TouchableOpacity>
		<Image
			source={backgroundImage || red_box}
			style={styles.menuButtonBackground}
			resizeMode="cover"
		/>
	</View>
);

const BattleCard = ({
	image,
	viewers,
}: { image: ImageSourcePropType; viewers: number | null }) => (
	<View style={styles.battleCard}>
		<Image source={image} style={styles.battleImage} />
	</View>
);

const styles = StyleSheet.create({
	contentContainer: {
		paddingTop: 50,
		paddingBottom: 100,
	},
	menuButtonBackground: {
		position: "absolute",
		width: "100%",
		height: "100%",
		borderRadius: 10,
		resizeMode: "contain",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: -1,
	},
	container: {
		flex: 1,
		backgroundColor: "transparent",
		paddingHorizontal: 16,
	},
	header: {
		marginVertical: 20,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	greeting: {
		fontSize: 24,
		color: "red",
		fontWeight: "bold",
		backgroundColor:
			"radial-gradient(182.5% 1012.92% at 79.76% 17.5%, rgba(255, 255, 255, 0) 0%, #FFFFFF 53.96%, rgba(255, 255, 255, 0) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))",
	},
	subGreeting: {
		fontSize: 18,
		color: "#FFFFFF4D",
	},
	profileIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	menuRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 16,
		gap: 16,
	},
	menuButton: {		
		padding: 16,
		marginTop: 16,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		borderTopRightRadius: 60,
		borderBottomRightRadius: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		position: "relative",
		height: 80,
		backgroundColor: "radial-gradient(346.48% 633.13% at 100% -80.28%, #E80101 0%, #900101 78.68%)",
	},
	menuIcon: {
		right: 0,
		top: -20,
		width: 80,
		height: 80,
	},
	menuText: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "bold",
	},
	sectionTitle: {
		fontWeight: "600",
		fontSize: 24,
		color: "#fff",
		marginTop: 32,
		lineHeight: 40,
	},
	battleRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 16,
	},
	battleCard: {
		width: "48%",
	},
	battleImage: {
		width: 224,
		height: 147,
		borderRadius: 10,
		objectFit: "contain",
	},
	viewers: {
		fontSize: 16,
		color: "#fff",
		marginTop: 8,
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
});

export default Index;
