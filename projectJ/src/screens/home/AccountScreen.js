import React from 'react';
import { Text, View } from 'react-native';


export default function AccountScreen({ navigation }) {
    return (
        <View style={{ backgroundColor: '#FFFFFF', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: 'bold' }} >Account Screen</Text>
        </View>
    )
}
