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
        idConnection: [],
        perfilPhoto:
          'https://www.selectenglish.co.uk/wp-content/uploads/2022/11/no-user-image.gif'
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
