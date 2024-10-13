import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { pball } from '@/assets/Media';
import { router } from 'expo-router';

const BottomNav = () => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => router.push("/")}
      >
        <LinearGradient
          colors={["rgba(50,50,50,0.8)", "rgba(30,30,30,0.9)"]}
          style={styles.pokeball}
        >
          <View style={styles.pokeballInner}>
            <Image source={pball} style={styles.pokeballLine} />
          </View>
        </LinearGradient>
        <Text style={styles.homeText}>Home</Text>
      </TouchableOpacity>
      <LinearGradient
        colors={["rgba(50,50,50,0.8)", "rgba(30,30,30,0.9)"]}
        style={styles.container}
      >
        <View style={styles.navGrid}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="notifications-outline" size={24} color="#888" />
            <Text style={styles.navText}>Notifications</Text>
          </TouchableOpacity>

          <View style={styles.placeholderItem} />

          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="person-outline" size={24} color="#888" />
            <Text style={styles.navText}>User</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
	navText: {
		color: "#888",
		fontSize: 12,
	},
	wrapper: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
	},
	container: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		height: 80,
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		paddingBottom: 20,
	},
	navGrid: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	navItem: {
		flex: 1,
		alignItems: "center",
	},
	placeholderItem: {
		flex: 1,
	},
	homeButton: {
		position: 'absolute',
		top: -30,
		left: '50%',
		marginLeft: -30,
		alignItems: "center",
		zIndex: 100,
	},
	pokeball: {
		width: 70,
		height: 70,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	pokeballInner: {
		width: 54,
		height: 54,
		borderRadius: 27,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 100,
		position: "relative",
	},
	pokeballLine: {
		width: 54,
		height: 54,
		position: "absolute",
		zIndex: 100,
	},
	homeText: {
		color: "#fff",
		fontSize: 12,
		marginTop: 4,
	},
});

export default BottomNav;
