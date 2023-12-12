import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useState } from 'react'

function useGetIdOfCollection() {
  const [actualIdOfCollection, setActualIdOfCollection] = useState()
  const actualUserInformation = JSON.parse(sessionStorage.getItem('actualUser'))

  const getDocumentId = async (nameOfCollection) => {
    const refCollection = collection(db, nameOfCollection)

    try {
      const querySnapshot = await getDocs(refCollection)

      const actualId = Array(...querySnapshot.docs).find((doc) => {
        return (
          actualUserInformation.email ===
          doc._document.data.value.mapValue.fields.email.stringValue
        )
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
  return { getDocumentId, actualIdOfCollection }
}

export { useGetIdOfCollection }
