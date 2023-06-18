import React from 'react';

import { Text, StyleSheet, View, Image } from 'react-native';

import { useUser } from '@realm/react';

const Profile = () => {
  const user = useUser();

  this.state = {
    email: user.profile.email,
    numReports: 0
  };
  return (
    <View>
      <View style={{height: 120, marginBottom: 20}}>
        <Image source={require("../assets/ProfileBanner.jpg")} style={styles.profileBanner}></Image>
      </View>
      <Text style={styles.sectionTitle}>Email</Text>
      <View style={styles.box}>
        <Text style={styles.boxText}>{this.state.email}</Text>
      </View>
      <Text style={styles.sectionTitle}>Total Crowd Reports</Text>
      <View style={styles.box}>
        <Text style={styles.boxText}>{this.state.numReports}</Text>
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
