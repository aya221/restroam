import React from 'react-native';
import { StyleSheet, Text, View ,TextInput, TouchableOpacity} from 'react-native';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

export default function AddToiletScreen() {
  const onPress = () => console.log("here");
  return (
    <View style={styles.footer}>
      <TextInput 
      style={styles.input}
      onChangeText={value => {}}
      placeholder={'from'}
      >
      </TextInput>

      <TextInput 
      style={styles.input}
      onChangeText={value => {}}
      placeholder={'to'}
      >
      </TextInput>

    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
    width: '100%',
    flexDirection: "row",

  },
  leftButton: {
    backgroundColor: '#DDDDDD',
    padding: 7,
    borderRadius: 8,
    height: '70%',
    width: '23%',
    marginLeft: 15,
    marginRight: 10,
  },
  input: {

  }
  
});

