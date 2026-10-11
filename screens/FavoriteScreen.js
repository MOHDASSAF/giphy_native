import React from 'react';
import { View, Image, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite as removeFavoriteAction, clearFavorites } from '../slices/favoritesSlice';
import { renderGifCard } from './GiphyScreen';
import styles from './FavoriteScreen.styles';

export default function FavoriteScreen() {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleRemove = async (gifId) => {
    dispatch(removeFavoriteAction(gifId));

    try {
      const updated = favorites.filter((fav) => fav.id !== gifId);
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const removeAllFavorites = async () => {
    Alert.alert(
      'Remove all favorites?',
      'This will clear your entire favorites list.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove All',
          style: 'destructive',
          onPress: async () => {
            dispatch(clearFavorites());
            try {
              await AsyncStorage.setItem('favorites', JSON.stringify([]));
            } catch (error) {
              console.error('Error clearing favorites:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Image
          source={require('../assets/giphy-logo.jpg')}
          style={styles.logo}
        />
        <Text style={styles.topBarTitle}>My Favorites</Text>
      </View>

      <Text style={styles.countText}>
        {favorites.length} {favorites.length === 1 ? 'favorite' : 'favorites'}
      </Text>

      {favorites.length > 0 && (
        <TouchableOpacity style={styles.removeAllBtn} onPress={removeAllFavorites}>
          <Text style={styles.removeAllText}>Remove All</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderGifCard(item, true, () => handleRemove(item.id))}
      />
    </SafeAreaView>
  );
}