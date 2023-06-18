import React, {useState} from 'react';

import Home from './Home';
import Map from './Map';
import Place from './Place';
import Profile from './Profile';
import PageHeader from './PageHeader';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const [storeVals, updateStore] = useState({
    storeName: "Panda Express",
    storeType: "Asian Food",
    storeScore: 5,
    storeLastReported: 20
  })


  const StoreComp = (props) => <Place name={storeVals.storeName} type={storeVals.storeType} score={storeVals.storeScore} lastReported={storeVals.storeLastReported} />
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveBackgroundColor: "white",
        tabBarActiveBackgroundColor: "#D7DBD8"
      }}>
      <Tab.Screen name="Home" component={Home} options={{
        headerTintColor: "white",
        tabBarLabelStyle: styles.textStandard,
        header: () => (
          <PageHeader />
        ),
        tabBarIcon: () => (
           <Image source={require("../assets/HomeMenuIcon.png")} style={styles.tinyLogo}/>
        )
      }}
      />
      <Tab.Screen name="Map" component={Map} options={{
        tabBarLabelStyle: styles.textStandard,
        header: () => (
          <PageHeader />
        ),
        tabBarIcon: () => (
           <Image source={require("../assets/MapMenuIcon.png")} style={styles.tinyLogo}/>
        ), 
      }}
      />
      <Tab.Screen name="Place" component={StoreComp} options={{
        tabBarLabelStyle: styles.textStandard,
        header: () => (
          <PageHeader />
        ),
        tabBarIcon: ({focused, color, size}) => (
           <Image source={require("../assets/StoreMenuIcon.png")} style={styles.tinyLogo}/>
        ), 
      }}
      />
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarLabelStyle: styles.textStandard,
        header: () => (
          <PageHeader />
        ),
        tabBarIcon: ({focused, color, size}) => (
           <Image source={require("../assets/ProfileMenuIcon.png")} style={styles.tinyLogo}/>
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
    resizeMode: 'contain'
  },
  textStandard: {
    color: "black",
    marginBottom: 3,
    justifyContent: "center",
    fontSize: 13
  }
});

export default Tabs;
