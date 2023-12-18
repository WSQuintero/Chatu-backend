import { useEffect } from 'react'
import { useSearchIdByEmail } from './useSearchIdByEmail'
import { useUpdateMessagesInFirestore } from './useUpdateMessagesInFirestore'
import { useDispatch } from 'react-redux'
import { resetMessages, updateMessages } from '../redux/messageSlice'
import { transformMessages } from '../helpers/transformMessages'

function useUpdateMessagesFromFirebase() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const { findUser, userFound: actualUserInfo } = useSearchIdByEmail()
  const dispatch = useDispatch()
  useUpdateMessagesInFirestore(actualUserInfo)

  useEffect(() => {
    findUser(currentUser.email)
  }, [])

  useEffect(() => {
    const actualUser = (information) =>
      information?._document?.data.value.mapValue.fields

    if (actualUserInfo) {
      const messagesInDbExist = actualUser(actualUserInfo)

      if (messagesInDbExist) {
        transformMessages(messagesInDbExist).forEach((mss) => {
          dispatch(updateMessages(mss)) // Fix dispatch here
        })
      } else {
        dispatch(resetMessages())
      }
    }
  }, [actualUserInfo])

  return true
}

export { useUpdateMessagesFromFirebase }
