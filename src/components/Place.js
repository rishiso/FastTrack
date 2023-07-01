import React, {useState, useEffect} from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { crowdLevel } from '../util/DescHelp';
import { BSON } from 'realm';

import { Text, StyleSheet, View } from 'react-native';

import { HStack } from 'react-native-flex-layout';

import RealmContext from '../RealmContext';
import { useUser } from '@realm/react';
import { GetIcon } from '../util/GetIcon';

const Place = (props) => {

  const [reportRating, setRating] = useState(5);

  const {useRealm, useObject} = RealmContext;
  const user = useUser();
  const realm = useRealm();
  const place = useObject("Location", props.currentPlace);

  useEffect(() => {
    // initialize the subscriptions
    const updateSubscriptions = async () => {
      await realm.subscriptions.update(mutableSubs => {
        // subscribe to all of the logged in user's to-do items
        let locations = realm.objects("Location");
        let reports = realm.objects("Report");
        // use the same name as the initial subscription to update it
        mutableSubs.add(reports);
        mutableSubs.add(locations);
      });
    };
    updateSubscriptions();
  }, [realm, user]);

  return (
    <View>
      <Image source={GetIcon.retrieve(place.icon)} style={{alignSelf: "center", margin: 20, maxHeight: 100, resizeMode: "contain"}}></Image>
      <Text style={styles.bizName}>{place.name}</Text>
      <Text style={styles.type}>{place.type}</Text>
      <View style={styles.crowdLevelBox}>
        <View style={{margin: 5}}>
          <Text style={styles.metrics}>{crowdLevel(place.crowdLevel)}</Text>
          <Text style={styles.metricDescription}>crowd level</Text>
        </View>
        <View style={{marginLeft: 25, marginRight: 25, borderWidth: 1}}></View>
        <View style={{margin: 5}}>
          <Text style={styles.metrics}>{10 + " min"}</Text>
          <Text style={styles.metricDescription}>last reported</Text>
        </View>
      </View>
      <Text style={[styles.metricDescription, {marginTop: 40, marginBottom: 20}]}>How crowded is this place?</Text>
      <HStack style={{justifyContent: "center"}} spacing={10}>
        <TouchableOpacity style={(reportRating == 1) ? styles.reportSelected : styles.reportNotSelected} onPress={() => setRating(1)}>
          <Text style={[(reportRating == 1) ? styles.textSelected : styles.textNotSelected, {padding: 3}]}>Low</Text>
        </TouchableOpacity>
        <TouchableOpacity style={(reportRating == 5) ? styles.reportSelected : styles.reportNotSelected} onPress={() => setRating(5)}>
          <Text style={[(reportRating == 5) ? styles.textSelected : styles.textNotSelected, {padding: 3}]}>Moderate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={(reportRating == 10) ? styles.reportSelected : styles.reportNotSelected} onPress={() => setRating(10)}>
          <Text style={[(reportRating == 10) ? styles.textSelected : styles.textNotSelected, {padding: 3}]}>High</Text>
        </TouchableOpacity>
      </HStack>
      <TouchableOpacity style={styles.logButton} onPress={() => {
            if (realm) {
              realm.write(() => {
                realm.create('Report', {
                  _id: new BSON.ObjectID(),
                  location: place.name,
                  reporter: user.id,
                  time: (new Date()).getTime(),
                  crowdLevel: reportRating
                });
              });
            }
      }}>
        <Text style={styles.logText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  crowdLevelBox: {
    flexDirection: "row", 
    justifyContent: "center", 
    borderWidth: 1, 
    width: 300, 
    alignSelf: "center", 
    borderRadius: 10
  },
  reportNotSelected: {
    flexDirection: "row", 
    justifyContent: "center", 
    borderWidth: 1, 
    alignSelf: "center", 
    backgroundColor: "lightgrey", 
    borderRadius: 10,
    width: 110
  },
  reportSelected: {
    flexDirection: "row", 
    justifyContent: "center", 
    borderWidth: 1, 
    alignSelf: "center", 
    backgroundColor: "#BF970A",
    borderRadius: 10,
    width: 110
  },
  textNotSelected: {
    fontSize: 20,
    justifyContent: "center",
    alignSelf: "center",
    fontWeight: "bold"
  },
  textSelected: {
    fontSize: 20,
    justifyContent: "center",
    alignSelf: "center",
    fontWeight: "bold",
    color: "white"
  },
  bizName: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: "center",
  },
  type: {
    fontSize: 18,
    color: "#4A4B4A",
    marginBottom: 20,
    textAlign: "center"
  },
  metrics: {
    fontSize: 20,
    justifyContent: "center",
    alignSelf: "center"
  },
  metricDescription: {
    fontSize: 16,
    justifyContent: "center",
    alignSelf: "center",
    color: "#4A4B4A"
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

export default Place;
