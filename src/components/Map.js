import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import {FindColor, GenDescription} from '../util/MarkerHelp';

import RealmContext from '../RealmContext';

const MapPage = () => {
  const {useRealm, useQuery} = RealmContext;
  const realm = useRealm();
  const places = useQuery('Location');

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
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsMyLocationButton={true}
        region={{
          latitude: 33.7756,
          longitude: -84.3981,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
        }}>
        {places.map(marker => (
          <Marker
            key={marker._id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.name}
            description={GenDescription(marker.crowdLevel)}
            pinColor={FindColor(marker.crowdLevel)}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapPage;
