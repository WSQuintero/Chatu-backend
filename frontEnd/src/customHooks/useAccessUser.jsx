import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../firebase/firebase'
import { useDispatch } from 'react-redux'
import { setIsUserAuthenticated } from '../redux/userAtuhenticated'

function useAccessUser() {
  const [userAuthenticated, setUserAuthenticated] = useState(null)
  const [errorUserAuthenticated, setErrorUserAuthenticated] = useState({})
  const dispatch = useDispatch()
  
  const startAccessUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUserAuthenticated(userCredential.user)
        dispatch(setIsUserAuthenticated(true))
      })
      .catch((error) => {
        setErrorUserAuthenticated({
          errorCode: error.code,
          errorMessage: error.message
        })
      })
  }
  return { startAccessUser, userAuthenticated, errorUserAuthenticated }
}

export { useAccessUser }
