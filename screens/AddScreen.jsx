import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'; //a lot of other cool pickers available rather than this one
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { addReading, getAllDays } from '../services/FirestoreServices';
import { Timestamp } from 'firebase/firestore';
import NavigationContainer from '@react-navigation/native';

const AddScreen = ({navigation}) => {

    const [temperature, setTemp] = useState("")
    const [selectedDay, setSelectedDay] = useState("")

    // the use effect is to call the data
    useEffect(() => {
        handleGettingDays()
    }, [])

    const [days, setDays] = useState([])

    const handleCreation = async () => {
        // TODO: Create new reading for the specific day
        // 1. create my data that needs to be added for each reading
        var reading = {
            temp: temperature,
            time: Timestamp.now()
        }

        // 2. call my firebase functio
        var success = await addReading(selectedDay, reading) // true or false bassed on try catch

        if (success) {
            navigation.goBack() // ! navigation is not working 
        }
    }

    const handleGettingDays = async () => {
        var daysData = await getAllDays()
        setDays(daysData) // calling from the useState and setting it as daysData
    }

    return (
        <View style={styles.container}>

            <Picker
                style={styles.inputField}
                selectedValue={selectedDay}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedDay(itemValue)
                }>
                {/* TODO: Update to data from db */}
                {days != [] ? (
                    days.map((day) => (

                        <Picker.Item key={day.id} label={day.name} value={day.id} /> // setting the value = to the doc id

                    ))
                ) : null}

                {/* <Picker.Item label="Tuesday" value="tuesday" /> */}
            </Picker>

            <TextInput
                style={styles.inputField}
                placeholder="Temperature"
                onChangeText={newText => setTemp(newText)}
                defaultValue={temperature}
            />

            <TouchableOpacity style={styles.button} onPress={handleCreation} >
                <Text style={styles.buttonText}>Add Reading</Text>
            </TouchableOpacity>

        </View>

    )
}

export default AddScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    inputField: {
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 15,
        padding: 10
    },
    button: {
        backgroundColor: "black",
        textAlign: 'center',
        padding: 15,
        marginTop: 30
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    },
})