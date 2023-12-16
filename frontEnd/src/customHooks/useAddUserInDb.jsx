import { collection, addDoc } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '../firebase/firebase'

function useAddUserInDb() {
  const [confirmationInfoAdded, setConfirmationInfoAdded] = useState(null)
  const [errorInfoAdded, setErrorInfoAdded] = useState(null)
  const sendInformationUser = async (informationUser) => {
    try {
      const docRef = await addDoc(collection(db, 'users'), informationUser)
      setConfirmationInfoAdded(docRef.id)
    } catch (error) {
      setErrorInfoAdded(error)
    }
  }
  return { sendInformationUser, errorInfoAdded, confirmationInfoAdded }
}

export  {useAddUserInDb}
