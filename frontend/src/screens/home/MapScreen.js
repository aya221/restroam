import React, { useState, useRef, useEffect , useContext} from 'react';
import { Text, Image, ScrollView, Fragment, FlatList, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { mapStyle } from '../../global/mapStyle';
import * as Location from 'expo-location'
import renderIf from './renderIf'
import MapViewDirections from 'react-native-maps-directions';
import StarRating from 'react-native-star-rating';
import DropDown from './DropDown';
import { mapStyleDarkMode } from '../../global/mapStyleDarkMode';
import ThemeContext from '../../darkMode/ThemeContext';

const _ = require('lodash');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import axios from "axios";
import { BACKEND_ENDPOINT_TOILETS } from '../../constants';


export default function MapScreen({ navigation }) {
    const [position, setPosition] = useState(null);
    const [toiletsAround, setToiletsAround] = useState([{ latitude: 49.895685, longitude: 8.681163 },
    { latitude: 49.895975, longitude: 8.683416 },
    { latitude: 49.897620, longitude: 8.681999 },
    { latitude: 49.897316, longitude: 8.684767 },
    { latitude: 49.8693297, longitude: 8.6371352 },
    { latitude: 49.865, longitude: 8.6371350 },

    ]);

    const checkPermission = async () => {
        const hasPermission = await Location.requestForegroundPermissionsAsync();
        if (hasPermission.status === 'granted') {
            const permission = await askPermission();
            return permission;
        }
    }
    const [direction, setDirection] = useState(<View></View>);

    const askPermission = async () => {
        const permission = await Location.requestBackgroundPermissionsAsync();
        return permission.status === 'granted';
    }

    const getLocation = async () => {
        try {
            await Location.enableNetworkProviderAsync();
            let pos = await Location.getCurrentPositionAsync({ highAccuracy: true });
            setPosition({
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            //console.log(pos.coords.latitude);
            return {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }

        }
        catch (err) {
            console.log("something went wrong")
        }
    }

    const getToiletsAroundUser = async () => {
        console.log("heree");
        const p =await getLocation();
            //console.log(position);

            axios.post(`${BACKEND_ENDPOINT_TOILETS}/nearestToilets`, {
                latitude: p.latitude,
                longitude: p.longitude
            }).then(
                ({ status, data }) => {
                    console.log(data.payload);
                    setToiletsAround(data.payload);
                }
            )
            .catch(err => console.log("error"));
        
    }

    const _map = useRef(1);



    useEffect(() => {
        checkPermission();
        getToiletsAroundUser();

    }, [])


    const [clicked, setClicked] = useState(false);

    const handleSubmit = () => {
        setClicked(!clicked);

    }

    var item = {
        name: "toilet1",
        location: "kethastraße",
        rating: 2.5,
        description: "very good",
        openingHours: {
            Monday: '10:00-17:00',
            Tuesday: '10:00-17:00',
            Wednesday: '10:00-17:00',
            Thursday: '10:00-17:00',
            Friday: '10:00-17:00',
            Saturday: '10:00-17:00',
            Sunday: '10:00-17:00',
            
        },
    }

    const [markerclicked, setMarkerlicked] = useState(false);
    const [marker, setMarker] = useState({
        name: "toilet1",
        location: "kethastraße",
        rating: 2.5,
        description: "very good",
        openingHours: {
            Monday: '10:00-17:00',
            Tuesday: '10:00-17:00',
            Wednesday: '10:00-17:00',
            Thursday: '10:00-17:00',
            Friday: '10:00-17:00',
            Saturday: '10:00-17:00',
            Sunday: '10:00-17:00',
        },
    }
);
    const [itemclicked, setItemclicked] = useState({});
    const [indexclicked, setIndexclicked] = useState(-1);
    const [vision, setVision] = useState(null);

    const markerClick = (item1, index) => {
        console.log(item1);
        if (indexclicked == -1) {
            setMarkerlicked(!markerclicked);
            setIndexclicked(index);
            setVision({
                latitude: toiletsAround[index].latitude,
                longitude: toiletsAround[index].longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            })
        }
        else if (indexclicked == index) {
            setMarkerlicked(!markerclicked);
            setIndexclicked(-1);
        }
        else {
            setIndexclicked(index);
            setVision({
                latitude: toiletsAround[index].latitude,
                longitude: toiletsAround[index].longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            })
        }
        var found = toiletsAround.find(function (element) {
            return element > 4;
        });
        setMarker(item1);
        getToiletsAroundUser();
    }

    const theme = useContext(ThemeContext);
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <DropDown data={toiletsAround}></DropDown>
            <MapView
                ref={_map}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle={theme.theme == "light" ? mapStyle : mapStyleDarkMode}
                showsUserLocation={true}
                followsUserLocation={true}
                initialRegion={position == null ? {
                    latitude: 0,
                    longitude: 0,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                } : position}
                region={vision == null ? position : vision}
            >
                {toiletsAround.map((item, index) => {
                    return <MapView.Marker
                        coordinate={item}
                        key={index.toString()}
                        //title={marker.title}
                        //description={marker.description}
                        onPress={() => markerClick(item, index)}>
                        <Image source={require('../../../assets/toiletMarker.png')}
                            style={styles.toiletsAround}
                            resizeMode="cover" />
                    </MapView.Marker>
                })}{
                    direction
                }
            </MapView>
            {
                position == null ? <View style={{
                    zIndex: 500,
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#989898',
                    justifyContent: 'center',
                }}>
                    <ActivityIndicator color={'black'} size='large'>

                    </ActivityIndicator>
                </View> : <></>
            }

            {/* <View style={styles.top}>
                    <TouchableOpacity 
                        onPress={handleSubmit}
                        >
                        <Text style={styles.textStyle}>Nearby</Text>
                    </TouchableOpacity>
                </View> */}
            {renderIf(markerclicked)(
                <View style={[styles.bottom, {backgroundColor: theme.background}]}>
                    
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            width: '45%'
                        }}>
                            <Text style={[styles.title, {color: theme.icon}]}>{marker.name}</Text>
                            <Text style={{ fontSize: 10, color: theme.color }}>{marker.location}</Text>
                            <View style={styles.stars}>
                                <StarRating
                                    maxStars={5}
                                    disabled={true}
                                    rating={marker.rating}
                                    selectedStar={(rating) => { }}
                                    fullStarColor={"gold"}
                                    starSize={20}
                                />
                            </View>

                            <Text style={[styles.item, {color: theme.color}]}>{marker.description}</Text>

                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginRight: '15%'
                            }}>
                                <TouchableOpacity style={{
                                    display: 'flex',
                                    marginTop: '10%',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: theme.icon,
                                    borderRadius: 10,
                                    padding: '2%',
                                    width: '32%'
                                }} onPress={() => {
                                    setDirection(
                                        <MapViewDirections
                                            origin={position}
                                            destination={marker != null ? marker : position}

                                            apikey={"AIzaSyCFbwdnUJoJA5FD6NiAwFevhUnU5jHWycA"}
                                            strokeWidth={3}
                                            strokeColor="#222"
                                        />)
                                    var big = [0, 0]
                                    var small = [0, 0]
                                    if (position.latitude > marker.latitude) {
                                        big[0] = position.latitude;
                                        small[0] = marker.latitude
                                    } else { 
                                        big[0] = marker.latitude;
                                        small[0] = position.latitude
                                    }

                                    if (position.longitude > marker.longitude) {
                                        big[1] = position.longitude;
                                        small[1] = marker.longitude
                                    } else { 
                                        big[1] = marker.longitude;
                                        small[1] = position.longitude
                                    }
                                    setVision({
                                        latitude: small[0] + ((big[0] - small[0]) / 2),
                                        longitude: small[1] + ((big[1] - small[1]) / 2),
                                        latitudeDelta: (big[0] - small[0]) * 1.5,
                                        longitudeDelta: (big[1] - small[1]) * 1.5,
                                    })
                                }}>
                                    <Icon name="walk" size={25} color={theme.icon} />
                                    <Text style={{
                                        fontSize: 7.5,
                                        color: theme.icon
                                    }}>Directions</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    display: 'flex',
                                    marginTop: '10%',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: theme.icon,
                                    borderRadius: 10,
                                    padding: '2%',
                                    width: '32%'
                                }} onPress={() => {
                                    navigation.navigate("Rating",{toilet: marker})
                                }
                                }>
                                    <Icon name="pencil-box-multiple" size={25} color={theme.icon} />
                                    <Text style={{
                                        fontSize: 7.5,
                                        color: theme.icon
                                    }}>Review</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    display: 'flex',
                                    marginTop: '10%',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                    borderColor: theme.icon,
                                    borderRadius: 10,
                                    padding: '2%',
                                    width: '32%'
                                }} onPress={() => {
                                    navigation.navigate("WriteReport",{toilet: marker})
                                }
                                }>
                                    <Icon name="alert" size={25} color={theme.icon} />
                                    <Text style={{
                                        fontSize: 7.5,
                                        color: theme.icon
                                    }}>Report</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{
                            width: '50%',
                            marginRight: '5%',
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                color: theme.icon
                            }}>Opening Hours</Text>
                            {
                                Object.entries(marker.openingHours).map((key) => {
                                    return (<View style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        fontWeight: '20'
                                    }} key={key}>
                                        <Text style={{color: theme.color}}>
                                            {key[0] + ': '}
                                        </Text>
                                        <Text style={{color: theme.color}}>
                                            {key[1]}
                                        </Text>
                                    </View>)
                                })
                            }
                        </View>
                    </View>


                    
                </View>)}
                
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0.1,
    },

    map: {
        position: 'absolute',
        flex: 1,
        height: "100%",
        width: "100%",
    },

    toiletsAround: {
        width: 30,
        height: 30,

    },

    itemStyle: {
        fontSize: 10,
        color: "#007aff"
    },

    textStyle: {
        fontSize: 16,
    },
    top: {
        position: 'absolute',
        backgroundColor: "#fff",
        //paddingBottom: 150,
        //paddingTop: 220,
        //paddingHorizontal: 30
        width: "70%",
        top: "0%",
        height: "5%",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: "center",
        alignContent: "center",

    },
    tophidden: {
        backgroundColor: "#fff",
        //paddingBottom: 150,
        //paddingTop: 220,
        //paddingHorizontal: 30
        position: 'absolute',
        paddingBottom: 10,
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        width: "70%",
        height: "20%",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: "center",
        alignContent: "center",

    },
    bottom: {
        position: 'absolute',
        //backgroundColor: "#fff",
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 25,
        paddingRight: 10,
        flex: 0.2,
        bottom: "1%",
        width: "98%",
        left: "1%",
        borderRadius: 30,
        alignItems: "flex-start",
        alignContent: "center",

    },
    title: {
        fontSize: 22,

    },
    stars: {
        flexDirection: 'row',
        alignItems: 'center',
    },


});
