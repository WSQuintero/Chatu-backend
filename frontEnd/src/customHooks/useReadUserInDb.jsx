import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useState } from 'react'

function useReadUserInDb() {
  const [foundUser, setFoundUser] = useState(null)
  const readUserInDb = async (uid) => {
    const querySnapshot = await getDocs(collection(db, 'users'))
    const currentUser = Array(...querySnapshot.docs).find((user) => {
      const foundUid = user._document.data.value.mapValue.fields.uid.stringValue

      return String(foundUid) === String(uid)
    })
    setFoundUser(currentUser._document.data.value.mapValue.fields)
  }
  return { readUserInDb, foundUser }
}

export { useReadUserInDb }
