import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TextInput, Switch, Button, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useContext, useState, useRef } from 'react';
import Theme from '../../darkMode/Theme';
import ThemeContext from '../../darkMode/ThemeContext';
import { CheckBox } from "@rneui/base";
import TimeSlot from './TimeSlot';

export default function AddToilet({navigation}) {
  const [dayIsChecked, setDayIsChecked] = useState(

    {
      Mon: {checked: false,
            startHour: "<Starting Hour>",
            endHour: "<Closing Hour>"
      },
      Tue: {checked: false,
        startHour: "<Starting Hour>",
        endHour: "<Closing Hour>"
      },
      Wed: {checked: false,
        startHour: "<Starting Hour>",
        endHour: "<Closing Hour>"
      },
      Thu: {checked: false,
        startHour: "<Starting Hour>",
        endHour: "<Closing Hour>"
      },
      Fri: {checked: false,
        startHour: "<Starting Hour>",
        endHour: "<Closing Hour>"
      },
      Sat: {checked: false,
        startHour: "<Starting Hour>",
        endHour: "<Closing Hour>"
      },
      Sun: {checked: false,
        startHour: "<Starting Hour>",
        endHour: "<Closing Hour>"
      },
    }
  )
 
  const theme = useContext(ThemeContext)
  
  const [counter, setCounter] = useState(0);
  
  //let test = [null, null, []]
  const[test, setTest] = useState({
    start:'',
    end:'',
    days:[]
  })
  const [hourSlots, setHourSlots] = useState([<TimeSlot data={test}/>])

  const MAX_NB_SLOTS = 7;

  const addOneMoreTimeSlot = () =>{
    if(hourSlots.length < MAX_NB_SLOTS){
       // setCounter(counter + 1)
        console.log(counter)
        setHourSlots([...hourSlots, <TimeSlot data={test}/>])
        console.log(hourSlots)}
        else{
          return;
        }
  }
  
  const deletePreviousTimeSlot = () =>{
    if(hourSlots.length > 1){
      //setCounter(counter - 1)
      console.log(counter);
      let newList = [...hourSlots].slice(0, [...hourSlots].length-1)
      setHourSlots(newList)
    }
    else{
      return;
    }
  }
  

  return (
    <View style={styles.container}>
      <ScrollView style={{backgroundColor: theme.background}}>
      
      <View style={styles.centerTitle}>
        <Text style={[styles.cadre, {color: theme.color}]}>
          Add New Toilet
        </Text>
      </View>
      

      <View style={[styles.hoursContainer, styles.centerTitle] }>
        <Text style={[styles.openingHoursTxt, {color: theme.color}]}>
          Select opening hours
        </Text>

        {hourSlots.map(() => {
          return  <TimeSlot setData={setTest} data={test}/>
        }        
        )}
      </View>

        <TouchableOpacity style={styles.addMore} onPress={() => addOneMoreTimeSlot()}>
          <Text style={[styles.addMoreTxt, {color: theme.addMore}]}>
                [+] Add more Slots
          </Text>
      </TouchableOpacity>
      {
        
        hourSlots.length>1 ?
        <TouchableOpacity style={styles.addMore} onPress={() => deletePreviousTimeSlot()}>
          <Text style={[styles.addMoreTxt, {color: theme.addMore}]}>
                [-] Delete Previous Slot
          </Text>
      </TouchableOpacity>
      :
      <></>
      
      }

        <TouchableOpacity 
                style={[styles.btn, {backgroundColor: theme.submitBtn}]}
                onPress={() => {
                  // code to check hours 
                  navigation.navigate("More Toilet Infomation")}}
                        >
                <Text style={styles.stOfSubmit}>
                                Next
                </Text>
            </TouchableOpacity>

        
            </ScrollView>
    </View >
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    height: "100%"

  },
  cadre: {
    fontSize: 20,
    fontWeight: "bold"
  },
  centerTitle: {
    alignItems: "center",
    marginTop: 45
  },
  btn: {
    paddingHorizontal: 100,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 75,
    alignItems: "center"

},
stOfSubmit:{
    fontWeight: "bold"
},
openingHoursTxt: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8
},
hoursContainer: {
    marginTop: 10
},
holeContainer:{
  width: "50%"
},
entireCheckBox:{
  justifyContent: "center",
  alignItems: "center",
  
},
checkboxes:{
  flexDirection: "row",
},
safeContainerStyle: {
  flex: 1,
  margin: 20,
  justifyContent: "center",
},
DropDown:{
  flexDirection: "row"
},
addMore:{
  alignItems: "center",
  marginBottom: 20,
},
addMoreTxt:{
  fontWeight: "bold"
},
alignButtons:{
  flexDirection: "row",
  alignItems: "center"
},
startBox:{
  marginHorizontal: 15,
  alignItems: "center"
},
alignCenter:{
  alignItems: "center"
},
marginHours:{
  marginBottom: 3
}
});
