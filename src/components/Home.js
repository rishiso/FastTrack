import React from 'react';

import { StyleSheet, View, Image, ScrollView, Text, TextInput} from 'react-native';
import { HStack } from 'react-native-flex-layout';

import PlaceButton from "./PlaceButton";

const Home = (props) => {
  return (
    <View>
      <View style={{height: 120, marginBottom: 20}}>
        <Image source={require("../assets/HomeBanner.jpg")} style={styles.homeBanner}></Image>
      </View>
      <View style={styles.box}>
        <HStack spacing={10} style={{padding: 10}}>
          <Image source={require("../assets/SearchIcon.png")} style={{padding: 10, justifyContent: "center"}}></Image>
          <TextInput placeholder='Search Here' style={styles.searchText}/>
        </HStack>
      </View>
      <ScrollView style={{width: '100%', marginTop: 35, height: '65%'}}>
          <PlaceButton store="Panda Express" type="Dining"/>
          <PlaceButton store="Thanh's Room" type="Gaming"/>
          <PlaceButton store="CRC" type="Recreation"/>
          <PlaceButton store="Panda Express" type="Dining"/>
          <PlaceButton store="Panda Express" type="Dining"/>
          <PlaceButton store="Panda Express" type="Dining"/>
          <PlaceButton store="Panda Express" type="Dining"/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  homeBanner: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover",
  },
  img: {
    width: '90%',
    resizeMode: "contain",
    alignSelf: "center"
  },
  searchText: {
    fontSize: 18,
    width: "80%",
  },
  box: {
    alignItems: "center",
    borderWidth: 1,
    justifyContent: "center",
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
  }
});

export default Home;
