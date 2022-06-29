import React, { useState, useContext , useEffect} from "react";
import { Text, ScrollView, View, StyleSheet, TouchableOpacity } from "react-native"
import { TextInput, Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeContext from "../../darkMode/ThemeContext";
import {getAsyncStorageItem} from "../../util";
import {BACKEND_ENDPOINT_TOILETS} from "../../constants"
import * as Location from "expo-location"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import axios from "axios";

import { Image } from "react-native-animatable";
import Geocoder from "react-native-geocoder"

// change url backend login api (on heroku)
// for now it is set to the IP address of my machine (192.168.1.100) to test it on yours replace it with your IP
const baseUrl = BACKEND_ENDPOINT_TOILETS + "addToilet";

const AddInfoPage = ({ navigation }) => {
    var numberi = 0;
    const [price, setPrice] = useState('0,00€');
    const [address, setAddress] = useState('');
    const [details, setDetails] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const [currentLocation, setCurrentLocation] = useState("");

    function toggleSwitch() {
        setIsEnabled(!isEnabled);
    }

    function changePrice(v) {
        setPrice(v + '€');
        v = v + '€';
        console.log(price)
    }
    function changeAddress(v) {
        setAddress(v);
    }

    function changeDetails(v) {
        setDetails(v);
    }

    const getLocation = async () => {
        let coords = await Location.getCurrentPositionAsync();
        setCurrentLocation(coords)
        };
    
    
      const fillWithCurrentAddress =  async () =>{
        
        setAddress("")
        const latitude = currentLocation["coords"]["latitude"]
        const longitude= currentLocation["coords"]["longitude"]
    
        let response = await Location.reverseGeocodeAsync({
                 latitude,
                 longitude
             });
    
        for (let item of response) {
            let addresse = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
        setAddress(addresse)
        console.log(addresse)
        
      }}
      useEffect(() => {
        getLocation();
      }, [])
    
    
    const theme = useContext(ThemeContext);
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView>
                <View style={styles.containerElements}>
                    <Text style={[styles.title, { color: theme.color }]}>
                        Add more information
                    </Text>


                    <View>
                        <Text style={[styles.txt, { color: theme.color }]}>
                            Specify its location
                        </Text>
                        <TextInput style={styles.box}
                            mode="outlined"
                            editable={true}
                            //label="Give address"
                            placeholder="Enter address"
                            right={<TextInput.Affix text="/100" />}
                            activeOutlineColor={theme.activeOutColor}
                            onChangeText={(value) => changeAddress(value)}
                            value={address}
                        />
                        <TouchableOpacity onPress={async () => fillWithCurrentAddress()}
                                        style={[styles.getAddress, {backgroundColor: theme.submitBtn}]}>
                            <Text style={styles.getAddressText}>Get current address</Text>
                            <Icon 
                                name="map-marker"
                                size={20}
                            />

                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.details, { color: theme.color }]}>
                        Indicate details
                    </Text>
                    <View style={styles.detailsContainer}>
                        <View style={styles.position}>
                            <Text style={[styles.txt, { color: theme.color }]}>
                                Specify Price
                            </Text>
                            <TextInput style={styles.boxPrice}
                                defaultValue="0,00 €"
                                mode="outlined"
                                placeholder="Type place"
                                activeOutlineColor={theme.activeOutColor}
                                onChangeText={(value) => changePrice(value)}
                            />
                        </View>
                        <View>
                            <Text style={[styles.txt, { color: theme.color }]}>
                                Handicap Access
                            </Text>
                            <Switch
                                value={isEnabled}
                                onValueChange={toggleSwitch}
                                color={theme.activeOutColor}
                            />

                        </View>



                    </View>

                    <View>
                        <Text style={[styles.txt, { color: theme.color }]}>
                            Description
                        </Text>
                        <TextInput style={styles.box}
                            mode="outlined"
                            label="Other details"
                            placeholder="Type details"
                            right={<TextInput.Affix text="/250" />}
                            activeOutlineColor={theme.activeOutColor}
                            onChangeText={(value) => changeDetails(value)}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: theme.submitBtn }]}
                        onPress={() => {
                            console.log("inside add ");
                            getAsyncStorageItem('token').then(
                                (tokenFromStorage) => {
                                //setToken(tokenFromStorage);
                                axios.post(`${baseUrl}`, {
                                    address: address,
                                    name: address,
                                    price: price,
                                    token: tokenFromStorage,
                                    openingHours: JSON.stringify({ a: 'aaa' }),
                                    handicapAccess: isEnabled,
                                    details: details
                                }).then(
                                    () => navigation.navigate("ThankYou")
    
                                ).catch(err => console.log("couldn't add toilet"))
                                navigation.navigate("Upload Image")
                              })
                              .catch(err => console.log(err));
                            
                        }}
                    >
                        <Text style={styles.stOfSubmit}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>

    );
}

export default AddInfoPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        //backgroundColor: "white"
    },
    containerElements: {
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 20
    },
    box: {
        width: 250,
        paddingLeft: 8,
        fontWeight: "bold"
    },
    btn: {
        //backgroundColor: "#e6697e",
        paddingHorizontal: 80,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 35,
        marginHorizontal: 75,
        alignItems: "center"

    },
    stOfSubmit: {
        fontWeight: "bold"
    },
    detailsContainer: {
        display: "flex",
        flexDirection: "row"
    },
    boxPrice: {
        width: 130

    },
    txt: {
        marginVertical: 10,
        fontWeight: "bold"

    },
    details: {
        marginVertical: 20,
        fontSize: 20,
        fontWeight: "bold"
    },
    full: {
        height: "100%"
    },
    position: {
        marginRight: 10
    },
    getAddress:{
        flexDirection: "row",
        marginTop: 8,
        borderRadius: 3,
        width: 185,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    getAddressText: {
        fontWeight: "bold",
        marginRight: 5
    }



});
