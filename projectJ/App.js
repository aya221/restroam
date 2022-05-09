import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TextInput, Switch, Button } from 'react-native';
import TimeSelectArray from './components/TimeSelectArray';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import TimeSelect from './components/AddToilet';
import AddToilet from './components/AddToilet';

export default function App() {
  var numberi = 0;
  const [price, setPrice] = useState('0,00€');
  const [isEnabled, setIsEnabled] = useState(false);

  const [privacy, setPrivacy] = useState('Public');

  function toggleSwitch() {
    setIsEnabled(!isEnabled);
  }

  function changePrice(v) {
    setPrice(v + '€');
    v = v + '€';
    console.log(price)
  }

  function changePrivacy(item) {
    setPrivacy(item);
  }

  return (
    <AddToilet></AddToilet>
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
