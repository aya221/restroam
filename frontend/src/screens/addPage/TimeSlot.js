import React, {useContext, useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, View, TextInput, Switch, Button, ScrollView, TouchableOpacity } from "react-native"
import ThemeContext from "../../darkMode/ThemeContext";
import DateTimePicker from '@react-native-community/datetimepicker';
import { CheckBox } from "@rneui/base";

const TimeSlot = (props) => {
    const [dayIsChecked, setDayIsChecked] = useState(

        {
          Mon: false,
          Tue: false,
          Wed: false,
          Thu: false,
          Fri: false,
          Sat: false,
          Sun: false
        }
      )

      const [changedTime, setChangedTime] = useState(
        {
          startt: false,
          endd: false
        }
      )
      const arr = props.check;
      useEffect(() => {
        let tmp = {
          start: text,
          end: textEnd,
          days: []
        }
          Object.keys(dayIsChecked).forEach(k => {
            if(dayIsChecked[k]){
              tmp.days.push(k);
            }
          })
          tmp.start = text;
          tmp.end = textEnd;
          
          
          props.setData(tmp);
      
      },[dayIsChecked, text, textEnd, changedTime])

      const theme = useContext(ThemeContext)
    
      // Use States for Starting hours
      const [date, setDate] = useState(new Date());
      const [mode, setMode] = useState('time');
      const [show, setShow] = useState(false);
      const [text, setText] = useState("<Starting Hour>");
    
      // Use States for Closing hours
      const [dateEnd, setDateEnd] = useState(new Date());
      const [modeEnd, setModeEnd] = useState('time');
      const [showEnd, setShowEnd] = useState(false);
      const [textEnd, setTextEnd] = useState("<Closing Hour>");

      const padTo2Digits= (num)=> {
        return String(num).padStart(2, '0');
      }

      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate)
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate();
        let fTime = padTo2Digits(tempDate.getHours()) + ":" + padTo2Digits(tempDate.getMinutes());
        setText(fTime);
        setChangedTime({...changedTime,
                       startt: true
                      }); 
        setShow(!show)
      }
    
      const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || dateEnd;
        setDateEnd(currentDate)
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate();
        let fTime = padTo2Digits(tempDate.getHours()) + ":" + padTo2Digits(tempDate.getMinutes());
        setTextEnd(fTime); 
        setChangedTime({...changedTime,
          endd: true
         }); 
        setShowEnd(!showEnd)
      }
    
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showModeEnd = (currentMode) => {
        setShowEnd(true);
        setModeEnd(currentMode);
      };
    
      const displayTimepicker = () => {
        showMode("time");
        setShow(true);
        console.log("show === " + show)
      };
      const displayEndTimepicker = () => {
        showModeEnd("time");
        setShowEnd(true);
        console.log("show === " + showEnd)
      };

    return (
        <View style={styles.alignCenter}>
          <View style={styles.alignButtons}>

            <View style={styles.startBox}>
                <Text style={[styles.marginHours, {color: theme.color}]}>From {text}</Text>
                <Button title="Pick Start Time" 
                        onPress={displayTimepicker}
                        color={theme.submitBtn}
                        />
                {show && (
                  <DateTimePicker 
                    testID='dateTimePicker'
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
            </View>

            <View style={styles.startBox}>
                <Text style={[styles.marginHours, {color: theme.color}]}>To {textEnd}</Text>
                <Button title="Pick End Time" 
                        onPress={displayEndTimepicker}
                        color={theme.submitBtn}
                        />
                {showEnd && (
                  <DateTimePicker 
                    testID='dateTimePicker'
                    value={dateEnd}
                    mode={modeEnd}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeEnd}
                  
                  />
                )}
            </View>

          </View>

          <View style={styles.entireCheckBox}>
            <View style={styles.checkboxes}>
                <CheckBox  
                  title="Mon"
                  textStyle={{color: theme.color}}
                  containerStyle={{backgroundColor: theme.background}}  
                  checked={dayIsChecked.Mon}
                  checkedColor={theme.check}
                  onPress={() => setDayIsChecked({
                    ...dayIsChecked,
                    Mon: !dayIsChecked.Mon
                  })
                  }

                />
                <CheckBox  
                  title="Tue"
                  textStyle={{color: theme.color}}
                    containerStyle={{backgroundColor: theme.background}}  
                  checked={dayIsChecked.Tue}
                  checkedColor={theme.check}
                  onPress={() => setDayIsChecked({
                    ...dayIsChecked,
                    Tue: !dayIsChecked.Tue
                  })
                  }
                />
                <CheckBox  
                  title="Wed"
                  textStyle={{color: theme.color}}
                    containerStyle={{backgroundColor: theme.background}}  
                  checked={dayIsChecked.Wed}
                  checkedColor={theme.check}
                  onPress={() => setDayIsChecked({
                    ...dayIsChecked,
                    Wed: !dayIsChecked.Wed
                  })
                  
                  
                  }
                />
                
            </View>
            <View style={styles.checkboxes}>
            <CheckBox  
                  title="Thu"
                  textStyle={{color: theme.color}}
                    containerStyle={{backgroundColor: theme.background}}  
                  checked={dayIsChecked.Thu}
                  checkedColor={theme.check}
                  onPress={() => setDayIsChecked({
                    ...dayIsChecked,
                    Thu: !dayIsChecked.Thu
                  })
                  }
                />
              <CheckBox  
                title="Fri"
                textStyle={{color: theme.color}}
                containerStyle={{backgroundColor: theme.background}}  
                checked={dayIsChecked.Fri}
                  checkedColor={theme.check}
                  onPress={() => setDayIsChecked({
                    ...dayIsChecked,
                    Fri: !dayIsChecked.Fri
                  })
                  }
              />
              <CheckBox  
                title="Sat"
                textStyle={{color: theme.color}}
                containerStyle={{backgroundColor: theme.background}}  
                checked={dayIsChecked.Sat}
                  checkedColor={theme.check}
                  onPress={() => setDayIsChecked({
                    ...dayIsChecked,
                    Sat: !dayIsChecked.Sat
                  })
                  }
              />
              
              
            </View>
            <CheckBox  
                title="Sun"
                textStyle={{color: theme.color}}
                containerStyle={{backgroundColor: theme.background}}  
                checked={dayIsChecked.Sun}
                  checkedColor={theme.check}
                  onPress={() => setDayIsChecked({
                    ...dayIsChecked,
                    Sun: !dayIsChecked.Sun
                  })
                  }
              />
            </View>

          </View>
    )
};

export default TimeSlot;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
      cadre: {
        fontSize: 20,
        fontWeight: "bold"
      },
      centerTitle: {
        alignItems: "center",
        marginVertical: 20
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
      alignItems: "center",
      

    },
    alignCenter:{
      alignItems: "center",
      marginBottom: 20,
      paddingVertical: 9,
    },
    marginHours:{
      marginBottom: 3
    }
})
