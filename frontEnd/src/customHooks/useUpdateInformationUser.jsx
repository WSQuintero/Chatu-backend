import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useState } from 'react'

function useUpdateInformationUser() {
  const [isOkayUpdate, setIsOkayUpdate] = useState(false)
  const updateDocument = async ({
    nameOfColection,
    idDocument,
    newInformation
  }) => {
    const docRef = doc(db, nameOfColection, idDocument)

    try {
      await updateDoc(docRef, newInformation)
      setIsOkayUpdate(true)
    } catch (error) {
      console.error('Error al actualizar el documento:', error)
    }
  }

  return { updateDocument, isOkayUpdate, setIsOkayUpdate }
}

export { useUpdateInformationUser }