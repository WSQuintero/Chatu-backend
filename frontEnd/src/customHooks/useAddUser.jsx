import { useState } from 'react'
import { auth } from '../firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

function useAddUser() {
  const [userCredential, setUserCredential] = useState(null)
  const [errorAddUser, setErrorAddUser] = useState({})

  const startAddUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserCredential(userCredential.user)
      })
      .catch((error) => {
        setErrorAddUser({ errorCode: error.code, errorMessage: error.message })
      })
  }
  return { startAddUser, userCredential, errorAddUser }
}

export { useAddUser }
