import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { File, Paths } from 'expo-file-system';
import styles from './SettingsScreen.styles';

export default function SettingsScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userEmail');
        if (storedEmail !== null) {
          setEmail(storedEmail);
        }

        const storedPicName = await AsyncStorage.getItem('profilePicName');
        if (storedPicName !== null) {
          const savedFile = new File(Paths.document, storedPicName);
          if (savedFile.exists) {
            setProfilePic(savedFile.uri);
          }
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };

    loadSettings();
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'We need access to your photos to set a profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      try {
        const oldName = await AsyncStorage.getItem('profilePicName');

        const newName = `profile-${Date.now()}.jpg`;
        const pickedFile = new File(result.assets[0].uri);
        const savedFile = new File(Paths.document, newName);
        pickedFile.copy(savedFile);

        await AsyncStorage.setItem('profilePicName', newName);
        setProfilePic(savedFile.uri);

        if (oldName) {
          const oldFile = new File(Paths.document, oldName);
          if (oldFile.exists) oldFile.delete();
        }
      } catch (error) {
        console.error('Error saving profile picture:', error);
      }
    }
  };

  const removeImage = async () => {
    try {
      const name = await AsyncStorage.getItem('profilePicName');
      if (name) {
        const file = new File(Paths.document, name);
        if (file.exists) file.delete();
      }
      await AsyncStorage.removeItem('profilePicName');
    } catch (error) {
      console.error('Error removing profile picture:', error);
    }
    setProfilePic(null);
  };

  const handlePicturePress = () => {
    if (profilePic) {
      Alert.alert(
        'Profile Picture',
        'What would you like to do?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', style: 'destructive', onPress: () => removeImage() },
          { text: 'Change', onPress: () => pickImage() },
        ]
      );
    } else {
      pickImage();
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Log out?',
      'You will need to log in again to continue.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('isLoggedIn');
              await AsyncStorage.removeItem('userEmail');
            } catch (error) {
              console.error('Error logging out:', error);
            }

            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
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
        <Text style={styles.topBarTitle}>Settings</Text>
      </View>

      <TouchableOpacity onPress={handlePicturePress} style={styles.pictureWrapper}>
        {profilePic ? (
          <Image source={{ uri: profilePic }} style={styles.profilePic} />
        ) : (
          <View style={styles.placeholderPic}>
            <Text style={styles.placeholderText}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.emailText}>{email}</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutBtnText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}