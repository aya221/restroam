import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TextInput } from 'react-native';
import TimeSelect from './TimeSelect';

export default function TimeSelectArray() {
  const weekArray = [
    {
      day: 'Monday',
      startHour: 0,
      startMinute: 0, endHour: 0, endMinute: 0,
    },
    {
      day: 'Tuesday',
      startHour: 0,
      startMinute: 0, endHour: 0, endMinute: 0,
    },
    {
      day: 'Wdnesday',
      startHour: 0,
      startMinute: 0, endHour: 0, endMinute: 0,
    },
    {
      day: 'Thursday',
      startHour: 0,
      startMinute: 0, endHour: 0, endMinute: 0,
    },
    {
      day: 'Friday',
      startHour: 0,
      startMinute: 0, endHour: 0, endMinute: 0,
    },
    {
      day: 'Saturday',
      startHour: 0,
      startMinute: 0, endHour: 0, endMinute: 0,
    },
    {
      day: 'Sunday',
      startHour: 0,
      startMinute: 0, endHour: 0, endMinute: 0,
    },
  ];
  return (
    <View style={styles.cadreInput}>
      {weekArray.map(v => {
        return (<TimeSelect day={v.day} startHour={v.startHour}
          startMinute={v.startMinute} endHour={v.endHour} endMinute={v.endMinute} key={v.day}></TimeSelect>);
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  cadreInput: {
    borderWidth: 1,
    backgroundColor: "#fae8e0",
    padding: 2,
    margin: 5,
    borderRadius: 15,
    fontSize: 150,
    minWidth: 430,
  },
});
