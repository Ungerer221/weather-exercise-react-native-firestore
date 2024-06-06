import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReadingCard from './ReadingCard'

const ReadingScreen = ({navigation}) => {

    // TODO: Get all Days
  var dummyReading = {name: "Monday", icon: "sun", id: "123456789"}

  return (
    <View style={styles.container}>
      <Button title='Add Reading' onPress={() => navigation.navigate("Add")} />

      <ReadingCard day={dummyReading} />

    </View>
  )
}

export default ReadingScreen

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})