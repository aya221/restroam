import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import ThemeContext from "../../darkMode/ThemeContext";
import Toilet from './ownedToilets/Toilet';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from "axios";

import { BACKEND_ENDPOINT_TOILETS } from '../../constants';

const OwnedToiletsScreen = ({ route, navigation }) => {

    const { token } = route.params;

    const [toiletItems, setToiletItems] = useState([]);

    useEffect(() => {
        let isMounted = true;
        axios
            .post(BACKEND_ENDPOINT_TOILETS + 'user-owned-toilets', { token })
            .then(({ data }) => {
                if (isMounted) {
                    setToiletItems(data.payload);
                }
            }).catch(err => console.log(err));
        return () => { isMounted = false; };
        // fetchToilets();
    }, []);

    // const fetchToilets = () => {
    //     axios
    //         .post(BACKEND_ENDPOINT_TOILETS + 'user-owned-toilets', { token })
    //         .then(({ status, data }) => {
    //             console.log(data.payload);
    //             setToiletItems(data.payload);
    //         }).catch(err => console.log(err));
    // };

    const deleteToilet = (index) => {
        let toiletTbDeleted = toiletItems[index];
        let toiletsCopy = [...toiletItems];
        toiletsCopy.splice(index, 1);
        setToiletItems(toiletsCopy);
        axios
            .post(BACKEND_ENDPOINT_TOILETS + 'delete-toilet', { name: toiletTbDeleted.name })
            .then(({ data }) => {
                ToastAndroid.showWithGravity(
                    data.message,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM);
            })
            .catch(err => console.log(err.message));
    };

    const editToilet = ({ name, address, price, details, handicapAccess }) => {
        navigation.navigate('Edit Toilet',
            {
                token,
                originalTitle: name,
                originalLocation: address,
                originalPrice: price,
                originalDetails: details,
                originalHandicapAccess: handicapAccess,
            });
    };

    // const updateToilets = () => {
    //     fetchToilets();
    // };

    const alertConfirmDeleteToilet = (index) =>
        Alert.alert(
            "Remove Toilet?",
            "Are sure you want to remove this toilet? This action may not be reversible!",
            [
                {
                    text: "No",
                    onPress: () => { },
                    style: "cancel",
                },
                {
                    text: "Yes",
                    // still no backend state save
                    onPress: () => deleteToilet(index),
                    style: "default",
                },
            ],
            {
                cancelable: true,
                onDismiss: () => { }
            }
        );

    const theme = useContext(ThemeContext);

    return (
        <ScrollView style={{ backgroundColor: theme.background }}>
            <View style={[styles.container]}>
                <View style={styles.toiletsWrapper}>
                    <Text style={[styles.headerText, { color: theme.color }]}>
                        Your Owned Toilets:
                    </Text>
                    <View style={styles.items}>
                        {
                            toiletItems.map(({ name, address, price, details, handicapAccess }, index) => {
                                return (
                                    <View key={index} style={[styles.item, { backgroundColor: theme.backgroundToilet }]}>
                                        <Toilet
                                            title={name}
                                            location={address}
                                            price={price}
                                        />
                                        <View style={styles.itemRight}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    editToilet(
                                                        { name, address, price, details, handicapAccess }
                                                    )
                                                    // navigation.navigate('Edit Toilet', {
                                                    //     editTitle: { name },
                                                    //     editLocation: { address },
                                                    //     editPrice: { price }
                                                    // })
                                                }>
                                                <FontAwesome name="edit" size={25} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => alertConfirmDeleteToilet(index)}>
                                                <FontAwesome name="trash-o" size={25} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                    {/* <TouchableOpacity onPress={() => updateToilets()}>
                        <Text>Update</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#FFF'
    },
    toiletsWrapper: {
        paddingTop: 40,
        paddingHorizontal: 20
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    items: {
        marginTop: 30
    },
    item: {
        //backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 7,
        borderWidth: 4,
        borderColor: '#C0C0C0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    }
});

export default OwnedToiletsScreen;
