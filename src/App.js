import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {AppProvider, UserProvider, useUser} from '@realm/react';

import {appId, baseUrl} from '../atlasConfig.json';
import RealmContext from './RealmContext';
const {RealmProvider} = RealmContext;
import {NavigationContainer} from '@react-navigation/native';

import Welcome from './components/Welcome';
import Tabs from './components/Tabs';

const AppWrapper = () => {
  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <UserProvider fallback={Welcome}>
        <App />
      </UserProvider>
    </AppProvider>
  );
};

const App = () => {
  return (
    <>
      {/* After login, user will be automatically populated in realm configuration */}
      <RealmProvider
        sync={{
          flexible: true,
        }}
        fallback={() => (
          <View style={styles.activityContainer}>
            <ActivityIndicator size="large" />
          </View>
        )}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Tabs />
          </NavigationContainer>
        </SafeAreaProvider>
      </RealmProvider>
    </>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default AppWrapper;
