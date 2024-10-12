// if (__DEV__) {
// 	require("../ReactotronConfig");
// }
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
	DarkTheme,
	DefaultTheme,
	DrawerActions,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import StoreProvider from "@/store/StoreProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import Feather from "@expo/vector-icons/Feather";
import "react-native-reanimated";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { avatar, bg } from "@/assets/Media";
import { DrawerContent } from "@react-navigation/drawer";
import BottomNav from "@/components/shared/BottomNav";




export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

const SearchStack = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer>
				<Drawer.Screen
					name="index"
					options={{
						drawerLabel: "Inicio",
						title: "Inicio",
					}}
				/>
				<Drawer.Screen
					name="pokemons"
					options={{
						drawerLabel: "Pokémons",
						title: "Pokémons",
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
};

function RootLayoutNav() {
	const colorScheme = useColorScheme();	

	return (
		<StoreProvider>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<GestureHandlerRootView style={{ flex: 1, backgroundColor: "#000" }}>
					<Drawer
						drawerContent={(props) => (
							<View style={{ backgroundColor: "#000", zIndex: 200, flex: 1 }}>
								<DrawerContent {...props} descriptors={props.descriptors} />
							</View>
						)}
					>
						<Drawer.Screen
							name="index"
							options={{
								headerShown: false,
								drawerLabel: ({ color, focused }) => (
									<Text
										style={{
											color: "#fff",
											fontWeight: focused ? "bold" : "normal",
										}}
									>
										Home
									</Text>
								),
								title: "Home",
							}}
						/>
						<Drawer.Screen
							name="pokemons"
							options={{
								headerShown: false,
								drawerLabel: ({ color, focused }) => (
									<Text
										style={{
											color: "#fff",
											fontWeight: focused ? "bold" : "normal",
										}}
									>
										Search
									</Text>
								),
								title: "Search",
							}}
						/>
					</Drawer>
					<BottomNav />
				</GestureHandlerRootView>
			</ThemeProvider>
		</StoreProvider>
	);
}
