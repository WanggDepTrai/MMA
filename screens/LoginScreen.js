import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get('https://64b1f684062767bc4826b711.mockapi.io/Account');
      const accounts = response.data;
      const user = accounts.find(acc => acc.username === username && acc.password === password);

      if (user) {
        navigation.replace('Home');
      } else {
        Alert.alert('Invalid Credentials', 'Please check your username and password');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Little Lemon</Text>
      <Text style={styles.title}>Login To Continue</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#ccc" // Placeholder color
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#ccc" // Placeholder color
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#000', // Background color
  },
  welcome: {
    fontSize: 32,
    marginBottom: 10,
    textAlign: 'center',
    color: '#F4CE14', // Yellow color for welcome text
    fontWeight: 'bold', // Bold text
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    color: '#fff', // White color for title
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#555',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    color: '#fff', // White text color
    borderRadius: 10, // Rounded corners
    backgroundColor: '#333', // Dark gray background
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#F4CE14', // Yellow background color for button
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Rounded corners
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#000', // Black text color for button
    fontWeight: 'bold', // Bold text
  },
});

export default LoginScreen;
