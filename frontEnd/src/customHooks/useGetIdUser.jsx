import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useSearchIdByEmail } from './useSearchIdByEmail'

function useGetIdUser() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const [savedIdUser, setSavedIdUser] = useState()
  const { findUser, userFound: userInformation } = useSearchIdByEmail()
  const isOpenChat = useSelector((state) => state.isOpenChat)

  useEffect(() => {
    findUser(currentUser.email)
  }, [isOpenChat])

  useEffect(() => {
    if (userInformation) {
      setSavedIdUser(userInformation)
    }
  }, [userInformation])

  return { savedIdUser }
}

export { useGetIdUser }
