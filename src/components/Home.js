import React, {useEffect} from 'react';

import { StyleSheet, View, Image, ScrollView, Text, TextInput} from 'react-native';
import { HStack } from 'react-native-flex-layout';

import PlaceButton from "./PlaceButton";
import RealmContext from '../RealmContext';

const Home = (props) => {
  const {useRealm, useQuery} = RealmContext;
  const realm = useRealm();
  const places = useQuery('Location').sorted("name");

  useEffect(() => {
    // initialize the subscriptions
    const updateSubscriptions = async () => {
      await realm.subscriptions.update(mutableSubs => {
        let locations = realm.objects("Location")
        // use the same name as the initial subscription to update it
        mutableSubs.add(locations, {name: "location"});
      });
    };
    updateSubscriptions();
  }, [realm, places]);

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
        {places.map((marker) => (
          <PlaceButton key={marker._id} place={marker.name} type={marker.type} icon={marker.icon} />
        ))}
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
