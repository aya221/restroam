import React from 'react';
import { Text, View } from 'react-native';


export default function MapScreen({ navigation }) {
    return (
        <View style={{ backgroundColor: '#FFFFFF', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text onPress={() => alert('This is the "Home" screen')}
                style={{ fontSize: 26, fontWeight: 'bold' }} >Map Screen</Text>
        </View>
    )
}
