import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { avatar } from '@/assets/Media';

export default function Nav() {
	const nav = useNavigation();
  return (
			<View
				style={{					
					backgroundColor: "transparent",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<TouchableOpacity
					onPress={() => nav.dispatch(DrawerActions.openDrawer())}
				>
					<Feather name="menu" size={24} color="white" />
				</TouchableOpacity>
				<Image source={avatar} style={{ width: 32, height: 32 }} />
			</View>
		);
}

const styles = StyleSheet.create({})