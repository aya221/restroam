import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

import axios from "axios";

const LoginScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        email: "",
        password: "",
        check_textInputChange: false,
        secureTextEntry: true
    });

    const [message, setMessage] = useState('test');
    const [messageType, setMessageType] = useState('red');

    const handleLoginClick = (credentials) => {
        // do some backend logic here
        const url = 'url for backend login api (on heroku)';
        axios
            .post(url, credentials)
            .then((response) => {
                result = response.data;
                const { message, status, data } = result;
                if (status !== 'SUCCESS') {
                    handleMessage(message, status);
                } else {
                    // once that is finished navigate to next route
                    navigation.navigate('Home');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const textInputChange = (value) => {
        if (value.length != 0) {
            setData({
                ...data,
                email: value,
                check_textInputChange: true

            });
        } else {
            setData({
                ...data,
                email: value,
                check_textInputChange: false

            });
        }
    };

    const handleEye = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry

        })
    };

    const handlePassword = (value) => {
        setData({
            ...data,
            password: value
        })
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image style={styles.logo}
                    source={require("../../../assets/finder.png")}
                    animation="pulse"
                    easing="ease-out"
                    iterationCount="infinite" />
                <Text style={styles.headerMoto}>Login right now</Text>
            </View>
            <Animatable.View style={styles.footer}
                animation="fadeInUpBig">
                <View style={styles.box}>
                    <Text style={styles.entry}> Email Address</Text>
                    <View style={styles.alignBox}>
                        <FontAwesome name="envelope" size={23} />
                        <TextInput style={styles.enterInputField}
                            placeholder="Enter your Email"
                            autoCapitalize="none"
                            onChangeText={(value) => textInputChange(value)}
                        />
                        {data.check_textInputChange ?
                            <Animatable.View animation="bounceIn">
                                <Feather
                                    name="check-circle"
                                    color={"green"}
                                    size={20} />
                            </Animatable.View>
                            : null}
                    </View>
                </View>
                <View style={styles.box}>
                    <Text style={styles.entry}> Password</Text>
                    <View style={styles.alignBox}>
                        <FontAwesome name="lock" size={23} />
                        <TextInput style={styles.enterInputField}
                            placeholder="Enter your Password"
                            autoCapitalize="none"
                            secureTextEntry={data.secureTextEntry ? true : false}
                            onChangeText={(value) => handlePassword(value)}
                        />
                        <TouchableOpacity onPress={handleEye}>
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color={"grey"}
                                    size={20} />
                                :
                                <Feather
                                    name="eye"
                                    color={"grey"}
                                    size={20} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <Text style={{ color: messageType }}> {message} </Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.login} onPress={handleLoginClick} >
                        <Text style={{ fontWeight: "bold" }}>Login</Text>
                    </TouchableOpacity>
                    <Text>You don't have an Account ? Sign up now</Text>
                    <TouchableOpacity style={styles.reg}
                        onPress={() => navigation.navigate("SignUp")}>
                        <Text style={{ fontWeight: "bold" }}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#ddbea9',
        //backgroundColor: "#6b9080",
        //backgroundColor: "#f88b89",
        //backgroundColor: "#ffacaa",
        backgroundColor: "#f28d82",
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    footer: {
        flex: 1,
        backgroundColor: "#fff",
        //paddingBottom: 150,
        paddingBottom: 220,
        //paddingHorizontal: 30
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        //alignItems: "center"
    },
    logo: {
        width: 180,
        height: 180

    },
    headerMoto: {
        fontSize: 20,
        fontWeight: "bold"
    },
    alignBox: {
        flexDirection: "row",
        marginVertical: 12,

    },
    box: {
        marginLeft: 25,
        marginTop: 32
    },
    enterInputField: {
        marginLeft: 20,
        width: "70%"
    },
    check: {

    },
    entry: {
        fontSize: 15,
        fontWeight: "bold"
    },
    login: {
        //backgroundColor: "#f9dcc4",
        backgroundColor: "#fae8e0",
        width: "80%",
        //justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 10,
        justifyContent: "center",
        //marginTop: 9
        marginTop: 30,
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 15

    },
    buttons: {
        justifyContent: "center",
        alignItems: "center"
    },
    reg: {
        //backgroundColor: "#f9dcc4",
        width: "80%",
        //justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 9,
        borderColor: "black",
        borderWidth: 1

    }
});



