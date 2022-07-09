import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';

import ThemeContext from '../../darkMode/ThemeContext';


const DropDown = (props) => {
    const [options, setOptions] = useState(['Toilet1', 'Toilet2', 'Toilet3', 'Toilet4']);
    const FilterList = ['Distance', 'Rating', 'Price'];
    const [filter, setFilter] = useState('Distance');
    const [toilet, setToilet] = useState(null);
    const Unit = { Distance: 'KM', Price: '€', Rating: '*' }
    const dataTest = [
        {
            Name: 'Toilet1',
            Distance: 2,
            Rating: 4.5,
            Price: 7
        },
        {
            Name: 'Toilet2',
            Distance: 0.2,
            Rating: 3,
            Price: 2
        },
        {
            Name: 'Toilet3',
            Distance: 5,
            Rating: 5,
            Price: 1
        },
        {
            Name: 'Toilet42',
            Distance: 6,
            Rating: 2,
            Price: 0
        }
    ]
    useEffect(() => {
        var newOptions = [];
        dataTest.sort(function (a, b) {
            return filter != 'Rating' ? parseFloat(a[filter]) - parseFloat(b[filter]) : parseFloat(b[filter]) - parseFloat(a[filter]);
        });
        dataTest.forEach(d => {
            newOptions.push(d['Name'] + " :" + d[filter] + Unit[filter])
        })
        setOptions(newOptions)
    }, [filter])
    return (
        <View style={styles.container}>
            <ModalDropdown style={styles.drop} options={options} defaultValue='Toilet list' onSelect={(idx) => {
                setToilet(options[idx])
            }} dropdownStyle={styles.down} showSearch={true} adjustFrame={(s) => {
            }} renderSearch={<TextInput style={styles.inputStyle} placeholder={'search...'} onChangeText={(value) => {
                var newOptions1 = value == '' ? dataTest : dataTest.filter(o => o.Name.includes(value));
                var newOptions2 = value == '' ? [] : dataTest.filter(o => !o.Name.includes(value));
                newOptions1.sort(function (a, b) {
                    return filter != 'Rating' ? parseFloat(a[filter]) - parseFloat(b[filter]) : parseFloat(b[filter]) - parseFloat(a[filter]);
                });
                newOptions2.sort(function (a, b) {
                    return filter != 'Rating' ? parseFloat(a[filter]) - parseFloat(b[filter]) : parseFloat(b[filter]) - parseFloat(a[filter]);
                });
                var tmp = []
                newOptions1.forEach(d => {
                    tmp.push(d['Name'] + " :" + d[filter] + Unit[filter])
                })
                newOptions2.forEach(d => {
                    tmp.push(d['Name'] + " :" + d[filter] + Unit[filter])
                })
                console.log(tmp);
                setOptions(tmp);
            }}></TextInput>}>
            </ModalDropdown>
            <ModalDropdown style={styles.drop} options={FilterList} defaultValue='Filter' onSelect={(idx) => {
                setFilter(FilterList[idx])
            }} dropdownStyle={styles.down} adjustFrame={(s) => {
            }}>
            </ModalDropdown>
        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 20,
        zIndex: 300,
        justifyContent: 'space-between',
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    drop: {
        borderWidth: 0.5,
        padding: 10,
        paddingRight: 25,
        paddingLeft: 25,
        padding: 3
    },
    down: {
        width: 188,
        position: 'absolute',
        left: 112,
        top: 101
    },
    inputStyle: {
        borderWidth: 0.5,
        fontSize: 10,
        paddingLeft: 5
    }
}
)
export default DropDown;