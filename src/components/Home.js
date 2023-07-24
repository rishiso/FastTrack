import React, {useEffect} from 'react';

import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {HStack} from 'react-native-flex-layout';
import {SearchFilter} from '../util/SearchFilter';

import PlaceButton from './PlaceButton';
import RealmContext from '../RealmContext';
import {TabActions, useNavigation} from '@react-navigation/native';

const Home = props => {
  const {useRealm, useQuery} = RealmContext;
  const realm = useRealm();
  const [searchText, setSearchText] = React.useState('');
  const places = useQuery('Location').sorted('name');
  const navigation = useNavigation();

  useEffect(() => {
    // initialize the subscriptions
    const updateSubscriptions = async () => {
      await realm.subscriptions.update(mutableSubs => {
        let locations = realm.objects('Location');
        mutableSubs.add(locations, {name: 'location'});
      });
    };
    updateSubscriptions();
  }, [realm, places]);

  return (
    <View>
      <Image
        source={require('../assets/HomeBanner.jpg')}
        style={styles.homeBanner}></Image>
      <View style={styles.box}>
        <HStack spacing={10} style={{padding: 10}}>
          <Image
            source={require('../assets/SearchIcon.png')}
            style={{padding: 10, justifyContent: 'center'}}></Image>
          <TextInput
            placeholder="Search Here"
            style={styles.searchText}
            onChangeText={setSearchText}
          />
        </HStack>
      </View>
      <ScrollView style={{width: '100%', marginTop: 25, marginBottom: 175}}>
        {SearchFilter(places, searchText).map(place => (
          <TouchableOpacity
            key={place._id}
            onPress={() => {
              props.updatePlace(place._id);
              navigation.dispatch(TabActions.jumpTo('Place'));
            }}>
            <PlaceButton
              place={place.name}
              type={place.type}
              icon={place.icon}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  homeBanner: {
    height: 120,
    marginBottom: 20,
    width: '100%',
    resizeMode: 'cover',
  },
  img: {
    width: '90%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  searchText: {
    fontSize: 18,
    width: '80%',
  },
  box: {
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
  },
});

export default Home;
