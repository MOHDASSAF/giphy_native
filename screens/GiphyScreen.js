import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../slices/favoritesSlice';
import styles from './GiphyScreen.styles';

const apiKey = process.env.EXPO_PUBLIC_GIPHY_API_KEY;


const giphyUrl = (limit) =>
  `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}`;

export function renderGifCard(item, isFavorited, onToggleFavorite) {
  const cleanDesc = item.slug
    ? item.slug.split('-').slice(0, -1).join(' ')
    : 'No description available.';

  return (
    <View style={styles.boxin}>
      <View style={styles.boxinHead}>
        <Text style={styles.titleText}>{item.title || 'Untitled GIF'}</Text>
      </View>
      <View style={styles.boxinImg}>
        <Image source={{ uri: item.images.fixed_height.url }} style={styles.image} />
      </View>
      <View style={styles.boxinLower}>
        <View style={styles.boxinDesc}>
          <Text style={styles.descText}>{cleanDesc}</Text>
        </View>
        <View style={styles.boxinFav}>
          <Ionicons
            name={isFavorited ? 'heart' : 'heart-outline'}
            size={60}
            color={isFavorited ? '#ef81db' : '#e1cdcd'}
            onPress={onToggleFavorite}
          />
        </View>
      </View>
    </View>
  );
}

export default function GiphyScreen({ navigation }) {
  const [gifs, setGifs] = useState([]);
  const [limit, setLimit] = useState(9);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const fetchGifs = async (currentLimit, isInitial = false) => {
    try {
      setLoadingMore(true);
      setFetchError(false);

      const apiCall = axios.get(giphyUrl(currentLimit));

      if (isInitial) {
        const minDelay = new Promise((resolve) => setTimeout(resolve, 1500));
        const [response] = await Promise.all([apiCall, minDelay]);
        setGifs(response.data.data);
      } else {
        const response = await apiCall;
        setGifs(response.data.data);
      }
    } catch (error) {
      console.warn('Error fetching gifs:', error);
      setFetchError(true);
    } finally {
      setLoadingMore(false);
      setInitialLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchGifs(9);
    setLimit(9);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleRetry = () => {
    setInitialLoading(true);
    setLimit(9);
    fetchGifs(9, true);
  };

  useEffect(() => {
    fetchGifs(limit, true);
  }, []);

  const toggleFavorite = async (gif) => {
    const alreadyFavorited = favorites.some((fav) => fav.id === gif.id);

    if (alreadyFavorited) {
      dispatch(removeFavorite(gif.id));
    } else {
      dispatch(addFavorite(gif));
    }

    try {
      const updated = alreadyFavorited
        ? favorites.filter((fav) => fav.id !== gif.id)
        : [...favorites, gif];
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    } catch (error) {
      console.warn('Error saving favorites:', error);
    }
  };

  if (initialLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#D01090" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Image
          source={require('../assets/giphy-logo.jpg')}
          style={styles.logo}
        />
        <Text style={styles.topBarTitle}>My Giphy</Text>

        <TouchableOpacity
          style={{ marginLeft: 'auto' }}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Ionicons name="heart" size={26} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginLeft: 16 }}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={26} color="white" />
        </TouchableOpacity>
      </View>

      {fetchError && gifs.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ fontSize: 16, textAlign: 'center', color: '#555' }}>
            Something went wrong loading gifs. Please try again later.
          </Text>
          <TouchableOpacity style={{ marginTop: 16 }} onPress={handleRetry}>
            <Text style={{ color: '#D01090', fontWeight: 'bold', fontSize: 16 }}>Try again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={gifs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            renderGifCard(
              item,
              favorites.some((fav) => fav.id === item.id),
              () => toggleFavorite(item)
            )
          }
          onEndReached={() => {
            if (loadingMore) return;
            const newLimit = limit + 9;
            setLimit(newLimit);
            fetchGifs(newLimit);
          }}
          onEndReachedThreshold={0.01}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator size="large" color="#D01090" style={{ marginVertical: 20 }} />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}