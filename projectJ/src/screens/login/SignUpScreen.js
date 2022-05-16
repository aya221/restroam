import React from "react";
import { View, Text, Button, StyleSheet, Platform, Image, TextInput, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";


const LoginScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        email: "",
        password: "",
        check_textInputChange: false,
        secureTextEntry: true,
        secureTextEntry_Reenter: true
    });

    const handleSignUpClick = () => {
        // do some backend logic here

        // once that is finished navigate to next route
        navigation.navigate('Home');
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

    const handleEye_Reenter = () => {
        setData({
            ...data,
            secureTextEntry_Reenter: !data.secureTextEntry_Reenter
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

                <Text style={styles.headerMoto}>Sign up now</Text>
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
                        <TouchableOpacity
                            onPress={handleEye}
                        >
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
                    <Text style={styles.entry}> Re-enter Password</Text>
                    <View style={styles.alignBox}>
                        <FontAwesome name="lock" size={23} />
                        <TextInput style={styles.enterInputField}
                            placeholder="Enter your Password"
                            autoCapitalize="none"
                            secureTextEntry={data.secureTextEntry_Reenter ? true : false}
                            onChangeText={(value) => handlePassword(value)}
                        />
                        <TouchableOpacity
                            onPress={handleEye_Reenter} >
                            {data.secureTextEntry_Reenter ?
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
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.login} onPress={handleSignUpClick} >
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
        paddingBottom: 180,
        width: "100%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    logo: {
        width: 140,
        height: 140

    },
    headerMoto: {
        fontSize: 17,
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
        width: "70%",
    },
    check: {

    },
    entry: {
        fontSize: 15,
        fontWeight: "bold"
    },
    login: {
        backgroundColor: "#fae8e0",
        width: "80%",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 9,
        borderColor: "black",
        borderWidth: 1,
        marginBottom: 15

    },
    buttons: {
        justifyContent: "center",
        alignItems: "center"
    },
    reg: {
        width: "80%",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 35,
        borderColor: "black",
        borderWidth: 1

    }
});



