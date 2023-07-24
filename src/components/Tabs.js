import React, {useState} from 'react';

import Home from './Home';
import Map from './Map';
import Place from './Place';
import Profile from './Profile';
import PageHeader from './PageHeader';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import {BSON} from 'realm';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const [currentPlace, updatePlace] = useState(
    new BSON.ObjectID('64975ca2ef472840ec4934ca'),
  );

  const PlaceComp = () => <Place currentPlace={currentPlace} />;
  const HomeComp = () => <Home updatePlace={updatePlace} />;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveBackgroundColor: 'white',
        tabBarActiveBackgroundColor: '#D7DBD8',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeComp}
        options={{
          headerTintColor: 'white',
          tabBarLabelStyle: styles.textStandard,
          header: () => <PageHeader />,
          tabBarIcon: () => (
            <Image
              source={require('../assets/HomeMenuIcon.png')}
              style={styles.tinyLogo}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabelStyle: styles.textStandard,
          header: () => <PageHeader />,
          tabBarIcon: () => (
            <Image
              source={require('../assets/MapMenuIcon.png')}
              style={styles.tinyLogo}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Place"
        component={PlaceComp}
        options={{
          tabBarLabelStyle: styles.textStandard,
          header: () => <PageHeader />,
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={require('../assets/StoreMenuIcon.png')}
              style={styles.tinyLogo}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabelStyle: styles.textStandard,
          header: () => <PageHeader />,
          tabBarIcon: ({focused, color, size}) => (
            <Image
              source={require('../assets/ProfileMenuIcon.png')}
              style={styles.tinyLogo}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    height: 22,
    resizeMethod: 'scale',
    resizeMode: 'contain',
  },
  textStandard: {
    color: 'black',
    marginBottom: 3,
    justifyContent: 'center',
    fontSize: 13,
  },
});

export default Tabs;
