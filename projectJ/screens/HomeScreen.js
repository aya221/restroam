import React from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps'
import {Footer} from '../components/Footer.js'

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <MapView style={{flex: 1}} 
          initialRegion={{latitude: 42.882004,longitude: 74.582748,latitudeDelta: 0.0922,longitudeDelta: 0.0421}} 
          showsUserLocation={true}>
        </MapView>
      </View>
      <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});