import React from 'react';

import { Text, StyleSheet, View, Image, ImageBackground } from 'react-native';
import { VStack, HStack } from "react-native-flex-layout";
import { TouchableOpacity } from 'react-native-gesture-handler';

const PlaceButton = (props) => {
  return (
    <TouchableOpacity>
        <View style={styles.box}>
            <HStack>
                <ImageBackground source={require("../assets/StoreButtonBackground.png")} resizeMode="stretch" style={{flex: 1, padding: 10}}>
                    <VStack style={styles.stack}>
                        <Text style={styles.nameFont}>{props.store}</Text>
                        <Text style={styles.typeFont}>{props.type}</Text>
                    </VStack>
                </ImageBackground>
                <Image source={require("../assets/Businesses/PandaExpress.png")} style={{height: 75, resizeMode: "contain"}}></Image>
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
        borderRadius: 21,
        marginBottom: 12
    },
    stack: {
        justifyContent: "center", 
    }
});

export default PlaceButton;