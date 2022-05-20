import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from 'react';



export default function TimeSelect(props) {
    const [startHour, setStartHour] = useState(0);
    const [endHour, setEndHour] = useState(0);
    const [startMinute, setStartMinute] = useState(0);
    const [endMinute, setEndMinute] = useState(0);
    const chengeInput = function (value, variable, fn) {
        fn(value);
        variable = value;
        console.log(variable);
    }
    const chengeStyleHours = function (variable) {
        if (parseInt(variable) < 0 || parseInt(variable) > 24 || !/\d/.test(variable)) {
            return {
                height: 30,
                margin: 12,
                borderWidth: 1,
                padding: 2,
                textAlign: 'center',
                backgroundColor: 'antiquewhite',
                color: 'red',
                borderRadius: 5,
                width: 50
            };
        }
        return {
            height: 30,
            margin: 12,
            borderWidth: 1,
            padding: 2,
            textAlign: 'center',
            backgroundColor: 'antiquewhite',
            color: 'grey',
            borderRadius: 5,
            width: 50
        };
    }
    const chengeStyleMinutes = function (variable) {
        if (parseInt(variable) < 0 || parseInt(variable) > 60 || !/\d/.test(variable)) {
            return {
                height: 30,
                margin: 12,
                borderWidth: 1,
                padding: 2,
                textAlign: 'center',
                backgroundColor: 'antiquewhite',
                color: 'red',
                borderRadius: 5,
                width: 50
            };
        }
        return {
            height: 30,
            margin: 12,
            borderWidth: 1,
            padding: 2,
            textAlign: 'center',
            backgroundColor: 'antiquewhite',
            color: 'grey',
            borderRadius: 5,
            width: 50
        };
    }
    return (
        <View style={styles.addInputs}>
            <Text style={{ minWidth: 100 }}>
                {props.day}
            </Text>
            <TextInput
                style={chengeStyleHours(startHour)}
                onChangeText={(v) => { chengeInput(v, props.startHour, setStartHour) }}
                placeholder="HH"
                keyboardType="numeric"
            />
            <Text>
                :
            </Text>
            <TextInput
                style={chengeStyleMinutes(startMinute)}
                onChangeText={(v) => { chengeInput(v, props.startHour, setStartMinute) }}
                placeholder="MM"
                keyboardType="numeric"
            />
            <Text>
                -
            </Text>
            <TextInput
                style={chengeStyleHours(endHour)}
                onChangeText={(v) => { chengeInput(v, props.endHour, setEndHour) }}
                placeholder="HH"
                keyboardType="numeric"
            />
            <Text>
                :
            </Text>
            <TextInput
                style={chengeStyleMinutes(endMinute)}
                onChangeText={(v) => { chengeInput(v, props.endMinute, setEndMinute) }}
                placeholder="MM"
                keyboardType="numeric"
            />
        </View>
    );
}
const styles = StyleSheet.create({
    cadreInput: {
        borderWidth: 1,
        backgroundColor: "#fae8e0",
        padding: 2,
        paddingRight: 35,
        marginTop: 2.5,
        borderRadius: 15,
        fontSize: 150,
    },
    addInputs: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20
    },
    input: {
        height: 30,
        margin: 1,
        borderWidth: 1,
        padding: 1,
        textAlign: 'center',
        backgroundColor: 'antiquewhite',
        width: 10,
    },
});