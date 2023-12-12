import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useState } from 'react'

function useSearchUserByEmail() {
  const [userFinded, setUserFinded] = useState(false)

  const findUser = async (email) => {
    const refCollection = collection(db, "users")

    try {
      const querySnapshot = await getDocs(refCollection)

      const userFinded = Array(...querySnapshot.docs).find((doc) => {
        return (
          email === doc._document.data.value.mapValue.fields.email.stringValue
        )
      })

      if (userFinded?.id) {
        setUserFinded(userFinded?._document.data.value.mapValue.fields)
      }
      if (querySnapshot.empty) {
        console.log('La colección está vacía.')
      }
    } catch (error) {
      console.error('Error al obtener documentos de la colección:', error)
    }
  }
  return { findUser, userFinded }
}

export { useSearchUserByEmail }
