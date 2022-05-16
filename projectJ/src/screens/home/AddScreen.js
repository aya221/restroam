import React from 'react';
import { Text, View } from 'react-native';


export default function AddScreen({ navigation }) {
    return (
        <View style={{ backgroundColor: '#FFFFFF', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text onPress={() => alert('This is the "Detail" screen')}
                style={{ fontSize: 26, fontWeight: 'bold' }} >Add Screen</Text>
        </View>
    )
}
