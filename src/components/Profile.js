import React, { useEffect } from 'react';

import { Text, StyleSheet, View, Image } from 'react-native';

import { useUser } from '@realm/react';
import RealmContext from '../RealmContext';

const Profile = () => {
  const {useRealm, useQuery} = RealmContext;
  const user = useUser();
  const realm = useRealm();
  const reports = useQuery('Report');

  useEffect(() => {
    // initialize the subscriptions
    const updateSubscriptions = async () => {
      await realm.subscriptions.update(mutableSubs => {
        // subscribe to all of the logged in user's to-do items
        let ownReports = realm
          .objects("Report")
          .filtered(`reporter == "${user.id}"`);
        // use the same name as the initial subscription to update it
        mutableSubs.removeByObjectType("Report");
        mutableSubs.add(ownReports);
      });
    };
    updateSubscriptions();
  }, [realm, user, reports]);

  return (
    <View>
      <View style={{height: 120, marginBottom: 20}}>
        <Image source={require("../assets/ProfileBanner.jpg")} style={styles.profileBanner}></Image>
      </View>
      <Text style={styles.sectionTitle}>Email</Text>
      <View style={styles.box}>
        <Text style={styles.boxText}>{user.profile.email}</Text>
      </View>
      <Text style={styles.sectionTitle}>Total Crowd Reports</Text>
      <View style={styles.box}>
        <Text style={styles.boxText}>{reports.length}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 22,
    marginLeft: '5%',
    marginBottom: 5,
    color: "#4A4B4A",
    fontWeight: 'bold'
  },
  profileBanner: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover",
  },
  boxText: {
    fontSize: 22,
    padding: 5
  },
  box: {
    alignItems: "center",
    borderWidth: 1,
    justifyContent: "center",
    width: '90%',
    alignSelf: 'center',
    borderRadius: 12,
    marginBottom: 20
  }
});

export default Profile;
