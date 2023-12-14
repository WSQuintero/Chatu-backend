import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useState } from 'react'

function useSearchUserByEmail() {
  const [userFound, setUserFound] = useState(false)

  const findUser = async (email) => {
    const refCollection = collection(db, 'users')
    try {
      const querySnapshot = await getDocs(refCollection)
      
      const foundUser = Array(...querySnapshot.docs).find((doc) => {
        const foundEmail =
        doc._document.data.value.mapValue.fields.email.stringValue
        return email === foundEmail
      })._document.data.value.mapValue.fields
      
      if (foundUser) {
        setUserFound(foundUser)
      }
      if (querySnapshot.empty) {
        console.log('La colección está vacía.')
      }
    } catch (error) {
      console.error('Error al obtener documentos de la colección:', error)
    }
  }
  return { findUser, userFound }
}

export { useSearchUserByEmail }
