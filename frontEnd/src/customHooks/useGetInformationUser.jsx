import { useEffect, useState } from 'react'
import { useSearchUserByEmail } from './useSearchUserByEmail'
import { useSelector } from 'react-redux'

function useGetInformationUser() {
  const currentUser =JSON.parse(sessionStorage.getItem("currentUser"))
  const [saveInformationUser, setSaveInformationUser] = useState()
  const { findUser, userFound: userInformation } = useSearchUserByEmail()
  const isOpenChat = useSelector((state) => state.isOpenChat)

  useEffect(() => {
    findUser(currentUser.email)
  }, [isOpenChat])

  useEffect(() => {
    if (userInformation) {
      setSaveInformationUser(userInformation)
    }
  }, [userInformation])

  return { saveInformationUser }
}

export { useGetInformationUser }
