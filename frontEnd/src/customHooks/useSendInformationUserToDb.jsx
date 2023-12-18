import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAddUserInDb } from './useAddUserInDb'

function useSendInformationUserToDb({ userCredential, userInformation }) {
  const navigate = useNavigate()

  const { sendInformationUser, errorInfoAdded, confirmationInfoAdded } =
    useAddUserInDb()

  useEffect(() => {
    if (userCredential?.accessToken) {
      sendInformationUser({
        ...userInformation,
        uid: userCredential?.uid,
        friends: [],
        messages: [],
        idConnection: []
      })
    }
  }, [userCredential])

  useEffect(() => {
    if (confirmationInfoAdded) {
      navigate('/login')
    } else {
      console.error(errorInfoAdded)
    }
  }, [confirmationInfoAdded, errorInfoAdded])
  return true
}

export { useSendInformationUserToDb }
