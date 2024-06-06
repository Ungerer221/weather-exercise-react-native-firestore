import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {Picker} from '@react-native-picker/picker'; //a lot of other cool pickers available rather than this one
import React, { useState } from 'react'

const AddScreen = () => {

    const [temperature, setTemp] = useState("")
    const [selectedDay, setSelectedDay] = useState("")

    const handleCreation = () => {
        // TODO: Create new reading for the specific day
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
                <Picker.Item label="Monday" value="monday" />
                <Picker.Item label="Tuesday" value="tuesday" />
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