import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useState } from 'react'

function useUpdateInformationUser() {
  const [isOkayUpdate, setIsOkayUpdate] = useState(false)
  const updateDocument = async ({
    nameOfCollection,
    idDocument,
    newInformation
  }) => {
    const docRef = doc(db, nameOfCollection, idDocument)

    try {
      await updateDoc(docRef, newInformation)
      setIsOkayUpdate(true)
      setTimeout(() => {
        setIsOkayUpdate(false)
      }, 2000)
    } catch (error) {
      console.error('Error al actualizar el documento:', error)
    }
  }

  return { updateDocument, isOkayUpdate, setIsOkayUpdate }
}

export { useUpdateInformationUser }
