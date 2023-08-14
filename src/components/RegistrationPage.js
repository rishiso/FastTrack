import React from 'react';
import Realm from 'realm';
import {useApp} from '@realm/react';

import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const RegistrationPage = props => {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePass] = React.useState('');
  const [retypePassword, onChangeRPass] = React.useState('');

  const app = useApp();

  const signIn = async () => {
    const creds = Realm.Credentials.emailPassword(email, password);
    await app.logIn(creds);
  };

  const validateEmail = e => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(e)) {
      if (e.indexOf('@gatech.edu', e.length - '@gatech.edu'.length) !== -1) {
        return true;
      }
    }
    return false;
  };

  const onPressSignUp = async () => {
    try {
      if (password === retypePassword && validateEmail(email)) {
        await app.emailPasswordAuth.registerUser({email, password});
        signIn(email, password);
      } else if (password !== retypePassword) {
        throw new Error('Passwords do not match');
      } else if (!validateEmail(email)) {
        throw new Error('Not a valid GT email');
      }
    } catch (error) {
      Alert.alert(`Failed to sign up: ${error.message}`);
    }
  };

  return (
    <View style={styles.screenStyle}>
      <ImageBackground
        source={require('../assets/LoginBackground.png')}
        style={styles.background}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <Text style={styles.title}>Registration</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={onChangePass}
          value={password}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Retype Password"
          style={styles.input}
          onChangeText={onChangeRPass}
          value={retypePassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.logButton} onPress={onPressSignUp}>
          <Text style={styles.logText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.swap(false)}>
          <Text style={styles.register}>
            <Text>Already have an account? </Text>
            <Text style={{fontWeight: 'bold'}}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    marginTop: '7%',
    marginBottom: '30%',
  },
  logo: {
    height: '16%',
    resizeMethod: 'scale',
    resizeMode: 'contain',
    marginTop: '20%',
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
    marginTop: 10,
  },
  input: {
    marginTop: '7%',
    width: '70%',
    padding: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#10551F55',
    fontSize: 16,
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
  },
});

export default RegistrationPage;
