import React, { useEffect,useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setFavorites } from './slices/favoritesSlice';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import {ActivityIndicator } from 'react-native';


import LoginScreen from './screens/LoginScreen';
import GiphyScreen from './screens/GiphyScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const dispatch = useDispatch();
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const loadInitialFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem('favorites');
        if (stored !== null) {
          dispatch(setFavorites(JSON.parse(stored)));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        setInitialRoute(isLoggedIn === 'true' ? 'Giphy' : 'Login');
      } catch (error) {
        console.error('Error checking login status:', error);
        setInitialRoute('Login');
      }
    };

    loadInitialFavorites();
    checkLoginStatus();
  }, []);

  if (initialRoute === null) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#D01090" />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Giphy" component={GiphyScreen} />
        <Stack.Screen name="Favorites" component={FavoriteScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}