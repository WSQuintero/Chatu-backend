import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'

function useAccessUser() {
  const [userAuthenticated, setUserAuthenticated] = useState(null)
  const [errorUserAuthenticated, setErrorUserAuthenticated] = useState({})

  const startAccessUser = (email, password) => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setUserAuthenticated(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message

        setErrorUserAuthenticated({ errorCode, errorMessage })
      })
  }
  return { startAccessUser, userAuthenticated, errorUserAuthenticated }
}

export { useAccessUser }
