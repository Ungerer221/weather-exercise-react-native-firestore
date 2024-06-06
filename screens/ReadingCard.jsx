import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { collection, onSnapshot, query, doc } from 'firebase/firestore';
import { db } from '../firebase';

const ReadingCard = (props) => {

  // TODO: Setup Realtime Listening for the specific day's readings
  const { day } = props

  var dummyReadings = [
    { id: "1", temp: 16, time: "12:00" },
    { id: "2", temp: 14, time: "9:00" },
    { id: "3", temp: 12, time: "6:00" }
  ]

  const [readings, setReadings] = useState([]);

  //  the real time data setup dont do while server is up
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log("in view.. so do something")
      // 1. specify where we want the data to be added
      const dayRef = doc(db, "days", day.id) // target a specific document see (dayId) to get the specific day
      // 2. specifiy sub collection in this document where we want to add doc
      const readingRef = collection(dayRef, "readings")

      // const q = query(collection(db, ""));

      // on snapshow = listen to the data changes
      // https://firebase.google.com/docs/firestore/query-data/listen#detach_a_listener
      const unsubscribe = onSnapshot(readingRef, (querySnapshot) => {

        const readingData = [];

        querySnapshot.forEach((doc) => {
          readingData.push(doc.data());
          console.log("Current reading: ", doc.data());
        });

        setReadings(readingData) // <- updating usestate that displays my readings 

      });

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log("out of view")
        unsubscribe() // <- stops listening for data changes
      };
    }, [])
  );



  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        <Feather name={day.icon} size={28} color="black" />
        {"  " + day.name + "  "}
        <Feather name={day.icon} size={28} color="black" />
      </Text>

      <View style={styles.readingsBlock}>

        {readings != [] ? (
          readings.map((item) => (
            <View style={styles.readingBubble} key={item.time}>
              <Text style={styles.readingText}>{item.temp}</Text>
            </View>
          ))
        ) : <Text>no readings</Text>}

      </View>

    </View>
  )
}

export default ReadingCard

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold'
  },
  readingsBlock: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20
  },
  readingBubble: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  readingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
})