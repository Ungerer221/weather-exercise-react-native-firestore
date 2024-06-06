import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ReadingCard from './ReadingCard'
import { getAllDays } from '../services/FirestoreServices'

const ReadingScreen = ({ navigation }) => {

  // TODO: Get all Days
  var dummyReading = { name: "monday", icon: "sun", id: "123456789" }

  
  // 3. make a use effect to load data
  // * when writing real time data always close the server and then always use consol logs to monitir
  // * only really use real time data when one doc is being loaded 
  useEffect(() => {
    handleGettingDays()
    }, []) // <- so that is renders and loads the data when the screen loads it runs the function
    //  issue with use effect it might have an issue when you come back to the screen 

    // 1. make a useState for Days 
    const [days, setDays] = useState([])
    const [daysName, setDaysName] = useState()
    
  // 2. make th function that will get all the data
  const handleGettingDays = async () => {
    console.log("running get days on home")
    var daysData = await getAllDays() // here we are making daysData = to getAllDays from the services file 
    setDays(daysData) // updating the usestate = the data we get from firebase
  }

  return (
    <View style={styles.container}>
      <Button title='Add Reading' onPress={() => navigation.navigate("Add")} />

      {/* to do slef get all the day and display them here using the card (just the days data not the readings yet) */}
      {days != [] ? (
        days.map((day) => (
          <ReadingCard key={day.id} day={day} />
        ))
      ) : null}

    </View>
  )
}

export default ReadingScreen

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})