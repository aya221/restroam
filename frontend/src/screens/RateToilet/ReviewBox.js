import React, { useState, useContext } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import ThemeContext from "../../darkMode/ThemeContext";
import StarRating from 'react-native-star-rating';


export default function ReviewBox ({ review }) {
    // Themes (Dark Mode / Default Mode)
    const theme = useContext(ThemeContext);
    return (
        <View>
            <View style={{ backgroundColor: theme.background}}>
                <View style={{
                    display: 'flex',
                    alignItems: "center",
                    borderWidth: 1,
                    margin: 5,
                    padding: 5,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: theme.reviewBorder
                }}>
                    <View style={{
                        width: "95%",
                        margin: 5,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={[styles.title, {color: theme.color}]}>{review.text}</Text>

                        <View style={styles.stars}>
                            <StarRating
                                maxStars={5}
                                disabled={true}
                                rating={review.stars}
                                selectedStar={(rating) => { }}
                                fullStarColor={"gold"}
                                starSize={20}
                            />
                        </View>
                    </View>

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        margin: 5,
                        padding: 5,
                    }}>
                        <Image source={require('../../../assets/code.png')} style={styles.image}>
                        </Image>
                        <Image source={require('../../../assets/code.png')} style={styles.image}>
                        </Image>
                        <Image source={require('../../../assets/code.png')} style={styles.image}>
                        </Image>
                    </View>

                </View>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        alignItems: "center"
    },
    title: {
        fontSize: 15,
        width: '50%'

    },
    stars: {
        flexDirection: 'row',
        alignItems: 'center',


    },
    image: {
        height: 200,
        width: 100,
        margin: 2
    }
});
