import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { pball } from '@/assets/Media';
import { router } from 'expo-router';

const BottomNav = () => {
  return (
    <LinearGradient
      colors={['rgba(50,50,50,0.8)', 'rgba(30,30,30,0.9)']}
      style={styles.container}
    >
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="notifications-outline" size={24} color="#888" />
        <Text style={styles.navText}>Notificaciones</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/')}>
        <LinearGradient
          colors={['#ff0000', '#cc0000']}
          style={styles.pokeball}
        >
          <View style={styles.pokeballInner}>
            <Image source={pball} style={styles.pokeballLine}/>
          </View>
        </LinearGradient>
        <Text style={styles.homeText}>Inicio</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="person-outline" size={24} color="#888" />
        <Text style={styles.navText}>Usuario</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		height: 80,
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		paddingBottom: 20,
		position: "absolute",
		bottom: 0,
		width: "100%",
	},
	navItem: {
		alignItems: "center",
	},
	navText: {
		color: "#888",
		fontSize: 12,
		marginTop: 4,
	},
	homeButton: {
		alignItems: "center",
		marginTop: -40,
		zIndex: 100,
	},
	pokeball: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 100,
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
