import React from 'react-native';
import { StyleSheet , View , TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from "react-native-vector-icons/FontAwesome";

export default function Footer() {
  const onPress = () =>{
    // navigation.navigate('addToilet');
  };
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.leftButton}
        onPress={onPress}
        activeOpacity={0.3}
      >
        <FontAwesomeIcon icon="fas fa-home"/>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.leftButton}
        onPress={onPress}
        activeOpacity={0.3}
      >
        <FontAwesomeIcon icon="fad fa-user" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.leftButton}
        onPress={onPress}
        activeOpacity={0.3}
      >
        <FontAwesomeIcon icon="fad fa-user" />
      </TouchableOpacity>
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
  
});
