import React, {useContext, useState,useEffect,} from "react";
import {View, Text, ScrollView} from 'react-native';
import Review from "./Review";
import ThemeContext from "../../darkMode/ThemeContext";
import {getAsyncStorageItem} from "../../util";
import axios from "axios";


import { BACKEND_ENDPOINT_REVIEWS } from '../../constants';

const ReviewsScreen = ({route, navigation}) => {
        //console.log(route.params);
        //const { token } = route.params;
        
        const [reviews, setReviews] = useState([]);
        useEffect(() => {
                fetchReviews();
            }, []);
        
        const fetchReviews = async () => {
        const token= await getAsyncStorageItem('token');
        console.log("token",token);
        axios
        .post(BACKEND_ENDPOINT_REVIEWS + 'userReviews', { token })
        .then(({ status, data }) => {
        console.log(data.payload);
        setReviews(data.payload);
        })
        .catch(err => console.log(err));
        }

        const theme = useContext(ThemeContext);
    return (
        <ScrollView style={{backgroundColor: theme.background}}>
            <View>
           { reviews.map(({address, rating, description ,date}) => {
                return (
                    <Review  title={address}
                            date={date}
                            stars={rating}
                            text={description}
                            />
                            )
                        }            
                )}
            </View>
        </ScrollView>
    )
}

export default ReviewsScreen;