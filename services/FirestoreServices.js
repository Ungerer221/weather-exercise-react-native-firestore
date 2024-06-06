import { addDoc, collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";



export const addReading = async (dayId, readingData) => {
    // TODO: Add reading to specific day

    try {
        // 1. specify where we want the data to be added
        const dayRef = doc(db, "days", dayId) // target a specific document see (dayId)

        // 2. specifiy sub collection in this document where we want to add doc
        const readingRef = collection(dayRef, "readings")

        // 3. add doc into this subcollection
        const docRef = await addDoc(readingRef, readingData)

        console.log("success adding doc id: " + docRef.id)
        return true // success

    } catch (e) {
        console.log("something went wong" + e)
        return false // failed
    }
}



export const getAllDays = async () => {
    // TODO: return the days that we want to read

    try {
        // 1. specifiy where we want to get data from
        const collectionRef = collection(db, "days",)

        const q = query(collectionRef, orderBy("dayOfWeek", "asc")) // just to order the documents but field in documents

        // 2. specify what it is that we want to do with collection, we want docs so where we want and what we want 
        const querySnapshot = await getDocs(q); // now call the q which is calling and sorting the collectionRef

        // 3. process my data to be managble 
        var daysData = []// this is what i want to return

        // loop through each document to add to the return
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            // var theDay = doc.data()
            // theDay.id = doc.id
            var theDay = { ...doc.data(), id: doc.id } // the id: is not include so we include it here to get the id of the docs
            daysData.push(theDay)
        });

        return daysData
        
    } catch (e) {
        console.log("something went wrong loggin the days" + e)
    }

}