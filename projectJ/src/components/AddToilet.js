import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TextInput, Switch, Button } from 'react-native';
import TimeSelectArray from './TimeSelectArray';
import { useState } from 'react'; import axios from 'axios';
const baseUrl = 'http://localhost:3000';

export default function AddToilet() {
  var numberi = 0;
  const [price, setPrice] = useState('0,00€');
  const [isEnabled, setIsEnabled] = useState(false);

  function toggleSwitch() {
    setIsEnabled(!isEnabled);
  }

  function changePrice(v) {
    setPrice(v + '€');
    v = v + '€';
    console.log(price)
  }

  const submitData = async function () {
    axios.post(`${baseUrl}/toilets/addToilet`, {
      address: 'test',
      price: price,
      openingHours: JSON.stringify({a:'aaa'}),
      handicapAccess: 'yes'
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.cadre}>
          Add Toilet
        </Text>
      </View>

      <View>
        <Text style={{ paddingLeft: "2%" }}>
          Opening hours
        </Text>
        <View style={{
          display: "flex",
          alignItems: 'center'
        }}>

        </View>
        <TimeSelectArray></TimeSelectArray>
        <Text style={{ padding: "2%" }}>
          Specify its location
        </Text>
        <View>
          <TextInput style={styles.input}
            placeholder="Address...">
          </TextInput>
        </View>
        <Text style={{ padding: "2%" }}>
          Indicate its details
        </Text>
        <View style={{
          display: 'flex',
          flexDirection: "row",
          justifyContent: "flex-start",
          marginLeft: '5%'
        }}>
          <View style={styles.cadreS}>
            <Text>Price</Text>
            <View style={{
              display: 'flex',
              flexDirection: "row",
              justifyContent: "flex-start",
              marginLeft: '5%',
              alignItems: 'center'
            }}>
              <TextInput style={styles.input}
                placeholder="0,00"
                onChangeText={x => changePrice(x)}>
              </TextInput>
              <Text style={{ fontSize: 20, }}>
                €
              </Text>
            </View>
          </View>
          <View style={styles.cadreS}>
            <Text>Handicap access</Text>
            <Switch
              trackColor={{ false: "#767577", true: "lightgreen" }}
              thumbColor={isEnabled ? "#A5AD8B" : "#EAA0B2"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={{
                margin: '10%',
                marginLeft: '35%',
              }}
            />
          </View>
        </View>
        <Text style={{ padding: 5 }}>
          Other Details
        </Text>
        <TextInput style={styles.inputDescription}
          multiline={true}
          placeholder="Insert description in here...">

        </TextInput>

        <View
          style={{ margin: 30 }}>
          <Button
            title="Submit"
            onPress={() => submitData()}
          />

        </View>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f28d82',
    justifyContent: 'flex-start',

  },
  cadre: {
    borderWidth: 1,
    backgroundColor: "#fae8e0",
    padding: "2%",
    paddingLeft: "35%",
    paddingRight: "35%",
    marginTop: "2.5%",
    borderRadius: 15,
    fontSize: 20,
  },
  cadreS: {
    borderWidth: 1,
    backgroundColor: "#fae8e0",
    padding: "2%",
    marginTop: "2.5%",
    borderRadius: 15,
    fontSize: 150,
    marginRight: '5%',
    minWidth: 150
  },
  containerTitle: {
    backgroundColor: '#f28d82',
    alignItems: 'center',
  },
  addInputs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: "5%",
    height: 60,
    marginLeft: '5%',
    borderWidth: 1,
    backgroundColor: 'rgb(250, 235, 215)',
    borderRadius: 15,
    marginRight: '5%',
    minWidth: 20
  },
  inputDescription: {
    padding: "5%",
    height: 60,
    marginLeft: '5%',
    borderWidth: 1,
    backgroundColor: 'rgb(250, 235, 215)',
    borderRadius: 15,
    marginRight: '5%',
    minWidth: 20,
    height: 100
  },
});
