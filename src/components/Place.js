import {useState, useEffect} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {crowdLevel} from '../util/DescHelp';
import {BSON} from 'realm';

import {Text, StyleSheet, View, Alert} from 'react-native';

import {HStack} from 'react-native-flex-layout';

import RealmContext from '../RealmContext';
import {useUser} from '@realm/react';
import {GetIcon} from '../util/GetIcon';
import {lastPlaceReport, recentUserReport} from '../util/LastReport';

const Place = props => {
  const [reportRating, setRating] = useState(5);
  const {useRealm, useQuery, useObject} = RealmContext;
  const user = useUser();
  const realm = useRealm();
  const place = useObject('Location', props.currentPlace);
  const placeReports = useQuery('Report')
    .filtered(`location == "${place.name}"`)
    .sorted('time', true);
  const userReports = placeReports.filtered(`reporter == "${user.id}"`);

  useEffect(() => {
    // initialize the subscriptions
    const updateSubscriptions = async () => {
      await realm.subscriptions.update(mutableSubs => {
        let locations = realm.objects('Location');
        let reports = realm.objects('Report');
        mutableSubs.add(reports);
        mutableSubs.add(locations);
      });
    };
    updateSubscriptions();
  }, [realm, placeReports, userReports, user, place]);

  return (
    <View>
      <Image source={GetIcon.retrieve(place.icon)} style={styles.img}></Image>
      <Text style={styles.bizName}>{place.name}</Text>
      <Text style={styles.type}>{place.type}</Text>
      <View style={styles.crowdLevelBox}>
        <View style={{margin: 5}}>
          <Text style={styles.metrics}>{crowdLevel(place.crowdLevel)}</Text>
          <Text style={styles.metricDescription}>crowd level</Text>
        </View>
        <View style={{marginLeft: 25, marginRight: 25, borderWidth: 1}}></View>
        <View style={{margin: 5}}>
          <Text style={styles.metrics}>{lastPlaceReport(placeReports)}</Text>
          <Text style={styles.metricDescription}>last reported</Text>
        </View>
      </View>
      <Text
        style={[
          styles.metricDescription,
          {marginTop: 40, marginBottom: 20, fontSize: 18},
        ]}>
        How crowded is this place?
      </Text>
      <HStack style={{justifyContent: 'center'}} spacing={10}>
        <TouchableOpacity
          style={
            reportRating == 1 ? styles.reportSelected : styles.reportNotSelected
          }
          onPress={() => setRating(1)}>
          <Text
            style={
              reportRating == 1 ? styles.textSelected : styles.textNotSelected
            }>
            Low
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            reportRating == 5 ? styles.reportSelected : styles.reportNotSelected
          }
          onPress={() => setRating(5)}>
          <Text
            style={
              reportRating == 5 ? styles.textSelected : styles.textNotSelected
            }>
            Moderate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            reportRating == 10
              ? styles.reportSelected
              : styles.reportNotSelected
          }
          onPress={() => setRating(10)}>
          <Text
            style={
              reportRating == 10 ? styles.textSelected : styles.textNotSelected
            }>
            High
          </Text>
        </TouchableOpacity>
      </HStack>
      <>
        {!recentUserReport(userReports) ? (
          <TouchableOpacity
            style={styles.logButton}
            onPress={() => {
              if (realm) {
                realm.write(() => {
                  realm.create('Report', {
                    _id: new BSON.ObjectID(),
                    location: place.name,
                    reporter: user.id,
                    time: new Date().getTime(),
                    crowdLevel: reportRating,
                  });
                });
              }
            }}>
            <Text style={styles.logText}>Confirm</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.logButton}
            onPress={() => {
              Alert.alert(
                'You have already reported!',
                'Please wait 30 minutes in between reports.',
              );
            }}>
            <Text style={styles.logText}>Confirm</Text>
          </TouchableOpacity>
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    alignSelf: 'center',
    margin: 20,
    maxHeight: 100,
    resizeMode: 'contain',
  },
  crowdLevelBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    width: 300,
    alignSelf: 'center',
    borderRadius: 10,
  },
  reportNotSelected: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    width: 110,
  },
  reportSelected: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: '#BF970A',
    borderRadius: 10,
    width: 110,
  },
  textNotSelected: {
    fontSize: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    padding: 3,
  },
  textSelected: {
    fontSize: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'white',
    padding: 3,
  },
  bizName: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  type: {
    fontSize: 18,
    color: '#4A4B4A',
    marginBottom: 20,
    textAlign: 'center',
  },
  metrics: {
    fontSize: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  metricDescription: {
    fontSize: 16,
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#4A4B4A',
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

export default Place;
