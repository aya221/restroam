import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, SafeAreaView } from 'react-native';
//import { TimePicker } from 'react-native-simple-time-picker';
//import DateTimePicker from '@react-native-community/datetimepicker';
import AddToilet from '../addPage/AddToilet';
import { getAsyncStorageItem, setAsyncStorageItem } from '../../util';


export default function AddScreen({ navigation }) {
    
    const [token, setToken] = useState();

        useEffect(() => {
            getAsyncStorageItem('token')
            .then((tokenFromStorage) => {
                if(tokenFromStorage == null) navigation.navigate("Not logged in");
                else setToken(tokenFromStorage);
            }).catch(err => console.log(err));
        }, []);

    return(
        
        
        <View style= {styles.container}>
            <AddToilet navigation={navigation}/>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        
    },
    openingTimes: {
       
    }
});
