import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TextInput, Switch, Button } from 'react-native';
import TimeSelectArray from './components/TimeSelectArray';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import TimeSelect from './components/AddToilet';
import AddToilet from './components/AddToilet';

export default function App() {

  return (
    <AddToilet></AddToilet>
  );
}

const styles = StyleSheet.create({
});
