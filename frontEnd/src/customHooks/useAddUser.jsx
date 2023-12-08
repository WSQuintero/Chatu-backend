import { useState } from 'react'
import { auth } from '../firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

function useAddUser() {
  const [userCredential, setUserCredential] = useState(null)
  const [errorAddUser, setErrorAddUser] = useState({})

  const startAddUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setUserCredential(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setErrorAddUser({ errorCode, errorMessage })
      })
  }
  return {startAddUser, userCredential, errorAddUser }
}

export  {useAddUser}
