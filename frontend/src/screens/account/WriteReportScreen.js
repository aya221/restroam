import React,{ useState, useEffect, useContext } from "react";
import {View, Text, TouchableOpacity,StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import { CheckBox } from "@rneui/base";
import { TextInput } from 'react-native-paper';
import ThemeContext from "../../darkMode/ThemeContext";

import {getAsyncStorageItem} from "../../util";

import axios from "axios";

import { BACKEND_ENDPOINT_REPORTS } from '../../constants';


const ReportsScreen = ({navigation,route}) => {
    const [notFound, setNotFound]=React.useState(false);
    const [clogged, setClogged]=React.useState(false);
    const [damaged, setDamaged]=React.useState(false);
    const [dirty, setDirty]=React.useState(false);


    const [text, onChangeText] = React.useState("");

    const handleSubmit = () =>{
        const {toilet} = route.params;
        getAsyncStorageItem('token').then(
            (tokenFromStorage) => {
            //setToken(tokenFromStorage);
            const complaints =(notFound ? `The toilet can no longer be found in its specified position.
            ` : ``)+
            (clogged ? `The toilet is clogged so that it is no longer usable.
            ` : ``)+
            (damaged ? `There are serious damages on the toilet that need to be repaired.
            ` : ``)+
            (dirty ? `The toilet is dirty that it requires substantial cleaning.` : ``);
            axios.post(BACKEND_ENDPOINT_REPORTS+'sendReport', {
                token: tokenFromStorage,
                address: toilet.location,
                issues: complaints,
                description: text,
                date:"date",
            }).then(
                () => navigation.navigate("ThankYou")
    
            ).catch(err => console.log("couldn't send report"))
            //navigation.navigate("error occured")
            })
            .catch(err => console.log(err));
    }
    
    const theme = useContext(ThemeContext)
    return (
        <ScrollView style={{backgroundColor: theme.backgroundReports}}>
            <View style={[styles.container]}>
                <Text style={[styles.headline, {color: theme.color}]}>
                    Report a toilet
                </Text>
                <Text style={[styles.text, {color: theme.color}]}>
                    Please select the reason for your report as precisely as possible. If you want to provide additional information, please use the text field.
                </Text>
                <View style={[styles.checkboxes]}>
                    <CheckBox
                        containerStyle={{backgroundColor: theme.backgroundToilet}}
                        title='The toilet can no longer be found in its specified position.'
                        checked={notFound}
                        onPress={()=> setNotFound(!notFound)}
                        checkedColor={theme.check}
                        textStyle={styles.checkbox}
                        />
                    <CheckBox
                        containerStyle={{backgroundColor: theme.backgroundToilet}}
                        title='The toilet is clogged so that it is no longer usable.'
                        checked={clogged}
                        onPress={()=> setClogged(!clogged)}
                        checkedColor={theme.check}
                        textStyle={styles.checkbox}
                        />
                    <CheckBox
                        containerStyle={{backgroundColor: theme.backgroundToilet}}
                        title='There are serious damages on the toilet that need to be repaired.'
                        checked={damaged}
                        onPress={()=> setDamaged(!damaged)}
                        checkedColor={theme.check}
                        textStyle={styles.checkbox}
                        />
                    <CheckBox
                        containerStyle={{backgroundColor: theme.backgroundToilet}}
                        title='The toilet is dirty that it requires substantial cleaning.'
                        checked={dirty}
                        onPress={()=> setDirty(!dirty)}
                        checkedColor={theme.check}
                        textStyle={styles.checkbox}
                        />
                </View>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Your report"
                    multiline={true}
                    activeOutlineColor="#e6697e"
                    />
                <View style={styles.buttonFlex}>
                <TouchableOpacity 
                            style={[styles.btn, {backgroundColor: theme.submitBtn}]}
                            onPress={handleSubmit}
                            >
                            <Text style={styles.submit}>
                                    Submit

                            </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection:'column',

    },
    headline:{
        flex: 1,
        fontSize:25,
        fontWeight:'bold',
        marginVertical: 15,
    },
    checkboxes:{
        flex:5,
        marginHorizontal:5,
        marginVertical: 20
    },
    checkbox:{
        fontWeight:'bold',
        },
    text:{
        flex:2,
        margin:10,
        fontSize:14,
        justifyContent:'center',
    },
    input:{
        flex:2,
        borderWidth: 1,
        padding:10,
        width:300,
        
    },
    buttonFlex:{
        flex:2,
    },
    btn: {
        paddingHorizontal:100,
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 30,
        justifyContent: "center",


    },

    submit:{
        textAlign:'center',
        fontWeight: "bold",
    },
});

export default ReportsScreen;