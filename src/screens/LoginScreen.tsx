import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useAuth} from '../contexts/AuthContext';

const LoginScreen = () => {
  const {anonymousLogin} = useAuth();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.loginButton} onPress={anonymousLogin}>
        <Text style={styles.loginButtonText}>Login Anonymously</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343541',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#343541',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
