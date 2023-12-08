import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useState } from 'react'

function useReadUserInDb() {
  const [findedUser, setFindedUser] = useState(null)
  const readUserInDb = async (uid) => {
    const querySnapshot = await getDocs(collection(db, 'users'))
    const actualUser = Array(...querySnapshot.docs).find((user) => {
      
      return (
        String(user._document.data.value.mapValue.fields.uid.stringValue) ===
        String(uid)
      )
    })
    setFindedUser(actualUser._document.data.value.mapValue.fields)
  }
  return { readUserInDb, findedUser }
}

export { useReadUserInDb }
