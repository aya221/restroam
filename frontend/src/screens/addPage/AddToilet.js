import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, TextInput, Switch, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useContext, useState, useRef, useEffect } from 'react';
import Theme from '../../darkMode/Theme';
import ThemeContext from '../../darkMode/ThemeContext';
import { CheckBox } from "@rneui/base";
import TimeSlot from './TimeSlot';

export default function AddToilet({navigation}) {
  
  const theme = useContext(ThemeContext)
  
  const [counter, setCounter] = useState(0);
  const [deleteItem, setDeleteItem] = useState(100);
  const[test, setTest] = useState({
    start: "",
    end: "",
    days: []
  })

  const [part, setPart] = useState([])
  const [rescue, setRescue] = useState([])
    useEffect(() => {
      if(test.days.length==0 || 
        test.end == "<Closing Hour>" ||
        test.start == "<Starting Hour>"
        ){
          return;
        }
        else{ 
          if(counter == 0){
              if(rescue.length > 0){
              // const check = rescue[rescue.length-1].days.every(e => {
              //   return test.days.includes(e);
              // })
              const check = rescue[0].days.every(e => {
                return test.days.includes(e);
              })
              if(check)
                {setRescue([...rescue.slice(0, rescue.length-1), test]);}}
              else
              {setRescue([...rescue, test]);}}
          
          else{
            const check2 = rescue[rescue.length-1].days.every(e => {
              return test.days.includes(e);
            })
              if(check2)
                {setRescue([...rescue.slice(0, rescue.length-1), test]);}
              else
              {setRescue([...rescue, test]);}
          }
        
        }
      
  }, [test])

  useEffect(() => {
    if(rescue.length == 1){
        setRescue(rescue)
    }
    else{
        setRescue(rescue.slice(0, rescue.length-1));
    }
  }, [deleteItem])

  const [hourSlots, setHourSlots] = useState([<View >
                                                <TimeSlot data={test}/> 
                                              </View>])
  const MAX_NB_SLOTS = 7;

  const addOneMoreTimeSlot =  () =>{
    if(hourSlots.length < MAX_NB_SLOTS){
        setCounter(counter + 1)
        setHourSlots([...hourSlots, <TimeSlot data={test}/>])
        setPart([...part, test])
      }
        else{
          return;
        }
  }
  
  const deletePreviousTimeSlot = () =>{
    if(hourSlots.length > 1){
      let newList = [...hourSlots].slice(0, [...hourSlots].length-1)
      // Check days Array
      setHourSlots(newList)
      setPart([...part].slice(0, [...part].length-1))
      setDeleteItem(deleteItem-1);
    }
    else{
      return;
    }
  }
  
  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView>
      
      <View style={styles.centerTitle}>
        <Text style={[styles.cadre, {color: theme.color}]}>
          Add New Toilet
        </Text>
      </View>
      


      <View style={[styles.infos]}>
        <Text style={{color:theme.color}}>
        * If you select different opening hours for the same day, only the last one will be taken into consideration. 
        </Text>
        <Text style={{color:theme.color}}>
        ** If you want to edit a previous slot, you need to delete all other slots.
        </Text>
      </View>

      <View style={[styles.hoursContainer, styles.centerTitle] }>
      
        <Text style={[styles.openingHoursTxt, {color: theme.color}]}>
          Select opening hours
        </Text>

        {hourSlots.map(({}, index) => {
          return  (
                  <View key={index} pointerEvents={hourSlots.length == index+1 ? "auto" : "none"}>
                    <TimeSlot setData={setTest} data={test}/>
                  </View> 
                  )
                 }        
        )}
      </View>
        {hourSlots.length < 7 ?
  
        <TouchableOpacity style={styles.addMore} onPress={() => addOneMoreTimeSlot()}>
          <Text style={[styles.addMoreTxt, {color: theme.addMore}]}>
                [+] Add more Slots
          </Text>
      </TouchableOpacity>
      :
      <></>
      
      }
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
                  console.log("Data just before Next Click == ", rescue);
                
                  if(rescue.length == 0){
                    Alert.alert(
                      "ERROR",
                      "Please choose opening times and days",
                      [
                        {  
                          text: 'Cancel',  
                          onPress: () => console.log('Cancel ERROR Pressed'),  
                          style: 'cancel',  
                      },  
                      {text: 'OK', onPress: () => console.log('OK ERROR Pressed')},  
                      ]
                    )
                  }else{
                    const checkInputs = rescue.every(obj => {                      
                      return (obj["start"] < obj["end"]) 
                              && (obj["days"].length!=0)
                              && (obj["start"] != "")
                              && (obj["end"] != "")
                              && (obj["start"] != "<Starting Hour>")
                              && (obj["end"] != "<Closing Hour>");
                    })
                    if(checkInputs){
                      navigation.navigate("More Toilet Infomation");
                    }else{
                      Alert.alert(
                                "Selected times/days problem",
                                "Days must be selected AND End Time cannot be smaller than start time",
                                [
                                  {  
                                    text: 'Cancel',  
                                    onPress: () => console.log('Cancel Pressed'),  
                                    style: 'cancel',  
                                },  
                                {text: 'OK', onPress: () => console.log('OK Pressed')},  
                                ]
                              )
                            }
                    }
                    
                  }
                }
              
                  
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
    justifyContent: 'flex-start',
    height: "100%",
    width: "100%"

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
},
infos:{
  marginTop: 15,
  paddingHorizontal: 15
}
});
