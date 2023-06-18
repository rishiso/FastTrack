import React from 'react';
import Realm from 'realm';
import { useApp } from '@realm/react';
import { Text, StyleSheet, View, Image, ImageBackground, TextInput, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LoginPage = (props) => {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePass] = React.useState('');

  const app = useApp();

  // signIn() uses the emailPassword authentication provider to log in
  const signIn = async () => {
    const creds = Realm.Credentials.emailPassword(email, password);
    await app.logIn(creds);
  };

  // onPressSignIn() uses the emailPassword authentication provider to log in
  const onPressSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };

  return (
    <View style={styles.screenStyle}>
      <ImageBackground
        source={require('../assets/LoginBackground.png')}
        style={styles.background}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <Text style={styles.motto}>Skip Line, Get Food</Text>
        <Text style={styles.login}>Login</Text>
        <TextInput
          placeholder='Email'
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
        />
        <TextInput
          placeholder='Password'
          style={styles.input}
          onChangeText={onChangePass}
          value={password}
          secureTextEntry={true}
        />
      <TouchableOpacity style={styles.logButton} onPress={onPressSignIn}>
        <Text style={styles.logText}>Confirm</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={() => props.swap(true)}>
          <Text style={styles.register}>
            <Text>Don't have an account? </Text>
            <Text style={{fontWeight: 'bold'}}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  motto: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: '7%',
  },
  login: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: '40%',
  },
  logo: {
    height: 100,
    resizeMethod: 'scale',
    resizeMode: 'contain',
    marginTop: '50%',
  },
  screenStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  register: {
    fontSize: 12,
    marginTop: 10
  },
  input: {
    marginTop: '7%',
    width: 240,
    padding: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#10551F55',
  },
  forget: {
    textAlign: 'right',
    marginTop: 3,
  },
  logButton: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '8%',
    backgroundColor: '#2E6D18',
    borderRadius: 25,
    height: 30,
    width: 175,
  },
  logText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  }
});

export default LoginPage;
