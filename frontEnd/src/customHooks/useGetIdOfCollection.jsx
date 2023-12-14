import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useState } from 'react'

function useGetIdOfCollection() {
  const [actualIdOfCollection, setActualIdOfCollection] = useState()
  const currentUserInformation = JSON.parse(sessionStorage.getItem('currentUser'))

  const getDocumentId = async () => {
    const refCollection = collection(db, "users")

    try {
      const querySnapshot = await getDocs(refCollection)

      const actualId = Array(...querySnapshot.docs).find((doc) => {
        const foundEmail =
          doc._document.data.value.mapValue.fields.email.stringValue
        return currentUserInformation.email === foundEmail
      })

      if (actualId?.id) {
        setActualIdOfCollection(actualId?.id)
      }
      if (querySnapshot.empty) {
        console.log('La colección está vacía.')
      }
    } catch (error) {
      console.error('Error al obtener documentos de la colección:', error)
    }
  }
  getDocumentId()
  return {  actualIdOfCollection }
}

export { useGetIdOfCollection }
