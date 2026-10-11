import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './LoginScreen.styles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const loginCheck = async () => {
    const cleanEmail = email.trim();

    if (cleanEmail === '' || pwd === '') {
      Alert.alert('Missing info', 'Please fill in your email and password');
      return;
    }

    if (!cleanEmail.includes('@')) {
      Alert.alert('Invalid email', 'Please enter a valid email');
      return;
    }

    try {
      await AsyncStorage.setItem('userEmail', cleanEmail);

      if (rememberMe) {
        await AsyncStorage.setItem('isLoggedIn', 'true');
      }
    } catch (error) {
      console.error('Error saving login state:', error);
    }

    navigation.replace('Giphy');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Image source={require('../assets/giphy-logo.jpg')} style={styles.logo} />
        <Text style={styles.topBarTitle}>My Giphy</Text>
      </View>

      <View style={styles.container2}>
        <View style={styles.logContainer}>
          <View style={styles.emailBox}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="example@ex.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.passBox}>
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              value={pwd}
              onChangeText={setPwd}
              secureTextEntry
            />
          </View>

          <View style={styles.submitBox}>
            <TouchableOpacity style={styles.submitBtn} onPress={loginCheck}>
              <Text style={styles.submitBtnText}>Log In</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.submitBox}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <Ionicons
                name={rememberMe ? 'checkbox' : 'square-outline'}
                size={24}
                color={rememberMe ? '#D01090' : '#888'}
              />
              <Text style={{ marginLeft: 8 }}>Remember me</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}