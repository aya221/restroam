import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import AddToilet from '../../components/AddToilet.js'


export default function AddScreen({ navigation }) {
    return (
    <ScrollView >
        <AddToilet></AddToilet>
    </ScrollView >
    )
}
