import React, {useState, useContext, useEffect} from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import * as Animatable from 'react-native-animatable';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import StarRating from 'react-native-star-rating';
import { TextInput } from 'react-native-paper';
import ThemeContext from "../../darkMode/ThemeContext";
import { getAsyncStorageItem } from "../../util";

import { useIsFocused } from "@react-navigation/core";
import axios from "axios";

import { BACKEND_ENDPOINT_REVIEWS } from '../../constants';

const RatingToiletScreen = ({ route, navigation }) => {
    

    // const [token, setToken] = useState();

    //     useEffect(() => {
    //         getAsyncStorageItem('token')
    //         .then((tokenFromStorage) => {
    //             if(tokenFromStorage == null) navigation.navigate("Not logged in");
    //             else setToken(tokenFromStorage);
    //         }).catch(err => console.log(err));
    //     }, []);


    const isFocused = useIsFocused();
        useEffect(() => {
            if (isFocused) {
            console.log("HELLO ADD");
            getAsyncStorageItem('token')
            .then((tokenFromStorage) => {
                if(tokenFromStorage == null){
                navigation.navigate("Not logged in");
                }else{
                setToken(tokenFromStorage);
                // axios
                //   .post(BACKEND_ENDPOINT_USERS + 'get-user-data', { token: tokenFromStorage })
                //   .then((response) => {
                //     const { data } = response;
                //     set_user_username(data.payload.username);
                //     set_user_email(data.payload.email);
                //   }).catch(err => {
                //     ToastAndroid.showWithGravity(
                //       err.response.data.message,
                //       ToastAndroid.LONG,
                //       ToastAndroid.BOTTOM);
                //   });
                }
            })
            .catch(err => console.log(err));
            }
        }, [isFocused]);




    const {toilet} = route.params;

    // Stars section
    const defaultRating = 3;
    const maxRating = 5;
    const [starCount1, setStarCount1] = useState(defaultRating)
    const [starCount2, setStarCount2] = useState(defaultRating)
    const [starCount3, setStarCount3] = useState(defaultRating)

    //Description section
    const [text, setText] = useState("");

    const onStarRatingPress = (rating) => {
        setStarCount1(rating)
    }
    const onStarRatingPress_wt = (rating) => {
        setStarCount2(rating)
    }
    const onStarRatingPress_sec = (rating) => {
        setStarCount3(rating)
    }
    function changeDetails(v) {
        setText(v);
    }

    // Average of all ratings
    const total = parseFloat(((starCount1 + starCount2 + starCount3) / 3).toFixed(2));


    const datee = new Date();
    const dateOfSubmission = `${datee.getDate()}/${datee.getMonth() + 1}/${datee.getFullYear()}`;

    const handleSubmit = () => {
        console.log(total);
        console.log(toilet);
        console.log("inside review ");
        getAsyncStorageItem('token')
            .then((tokenFromStorage) => {
                //setToken(tokenFromStorage);
                let revTbAdded = {
                    address: toilet.location,
                    cleanliness: starCount1,
                    waitingtime: starCount2,
                    security: starCount3,
                    rating: total,
                    description: text,
                    date: dateOfSubmission
                };

                navigation.navigate("Upload Image", { 
                    toiletOrReview: false, 
                    updateOrAdd: undefined, 
                    revTbAdded, 
                    toiletTbAdded: undefined,
                    token: tokenFromStorage });

                // axios.post(BACKEND_ENDPOINT_REVIEWS + 'addReview',).then(
                //     () => {
                //         console.log("DATE == ", dateOfSubmission)
                //         navigation.navigate("ThankYou")
                //     }

                // ).catch(err => console.log(err.response.data.message))
                // console.log("DATE == ", dateOfSubmission)
                // //navigation.navigate("error occured")
            })
            .catch(err => console.log(err));
    }

    // Themes (Dark Mode / Default Mode)
    const theme = useContext(ThemeContext);

    return (
        <SafeAreaView style={{ backgroundColor: theme.background, height: "100%" }}>
            <ScrollView >
                <View style={styles.container}>
                    <Text style={[styles.rateToilet, { color: theme.color }]}>Rate Toilet : </Text>
                    <View style={styles.center}>
                        <Text style={[styles.smallMargin, { color: theme.color }]}>
                            Cleanliness {starCount1} / {maxRating}
                        </Text>
                        <StarRating
                            maxStars={maxRating}
                            disabled={false}
                            rating={starCount1}
                            selectedStar={(rating) => onStarRatingPress(rating)}
                            fullStarColor={"gold"}
                        />
                    </View>

                    <View style={styles.center}>
                        <Text style={[styles.smallMargin, { color: theme.color }]}>
                            Waiting time {starCount2} / {maxRating}
                        </Text>
                        <StarRating
                            maxStars={maxRating}
                            disabled={false}
                            rating={starCount2}
                            selectedStar={(rating) => onStarRatingPress_wt(rating)}
                            fullStarColor={"gold"}
                        />
                    </View>
                    <View style={styles.center}>
                        <Text style={[styles.smallMargin, { color: theme.color }]}>
                            Security {starCount3} / {maxRating}
                        </Text>
                        <StarRating
                            maxStars={maxRating}
                            disabled={false}
                            rating={starCount3}
                            selectedStar={(rating) => onStarRatingPress_sec(rating)}
                            fullStarColor={"gold"}
                        />
                    </View>

                    <View style={styles.center}>
                        <Text style={[styles.smallMargin, { color: theme.color }]}>
                            Total {total} / {maxRating}
                        </Text>
                        <StarRating
                            maxStars={maxRating}
                            disabled={true}
                            rating={total}
                            fullStarColor={"gold"}
                        />
                    </View>

                    <View style={styles.description}>

                        <TextInput style={styles.box}
                            mode="outlined"
                            label="Description"
                            placeholder="Type something"
                            right={<TextInput.Affix text="/250" />}
                            activeOutlineColor={theme.activeOutColor}
                            onChangeText={(value) => changeDetails(value)}
                        />
                    </View>
                    <TouchableOpacity
                        style={[styles.btn, { backgroundColor: theme.submitBtn }]}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.stOfSubmit}>
                            Submit

                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default RatingToiletScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rateBlock: {
        marginVertical: 10
    },
    center: {
        alignItems: "center"
    },
    rateToilet: {
        marginVertical: 35,
        fontWeight: "bold",
        fontSize: 20
    },
    smallMargin: {
        marginVertical: 10,
        fontWeight: "bold",
    },
    btn: {
        backgroundColor: "#e6697e",
        paddingHorizontal: 100,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 30

    },
    stOfSubmit: {
        fontWeight: "bold"
    },
    box: {
        width: 250,
        paddingLeft: 8,
        fontWeight: "bold"
    },
    description: {
        marginVertical: 10
    },
    descriptionTxt: {
        fontWeight: "bold",
        marginBottom: 10
    }
});



