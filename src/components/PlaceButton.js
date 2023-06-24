import React from 'react';

import { Text, StyleSheet, View, Image, ImageBackground } from 'react-native';
import { VStack, HStack } from "react-native-flex-layout";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GetIcon } from '../util/GetIcon';

const PlaceButton = (props) => {
  return (
    <TouchableOpacity>
        <View style={styles.box}>
            <HStack>
                <ImageBackground source={require("../assets/StoreButtonBackground.png")} resizeMode="stretch" style={{flex: 1, padding: 10}}>
                    <VStack style={styles.stack}>
                        <Text style={styles.nameFont}>{props.place}</Text>
                        <Text style={styles.typeFont}>{props.type}</Text>
                    </VStack>
                </ImageBackground>
                <Image source={GetIcon.retrieve(props.icon)} style={styles.icon}></Image>
            </HStack>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    nameFont: {
       fontWeight: "bold",
       fontSize: 24,
       color: "white"
    },
    typeFont: {
        fontSize: 20,
        color: "white"
    },
    box: {
        borderWidth: 1, 
        width: "90%",
        alignSelf: "center", 
        borderRadius: 22,
        marginBottom: 12,
        paddingRight: 10,
    },
    stack: {
        justifyContent: "center", 
    },
    icon: {
        maxHeight: 75,
        width: 120,
        resizeMode: "contain",
        alignSelf: "center",
        margin: 2
    }
});

export default PlaceButton;