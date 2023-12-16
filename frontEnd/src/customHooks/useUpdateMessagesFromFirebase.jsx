import { useEffect } from 'react'
import { useSearchIdByEmail } from './useSearchIdByEmail'
import { useUpdateMessagesInFirestore } from './useUpdateMessagesInFirestore'
import { useDispatch } from 'react-redux'
import { resetMessages, updateMessages } from '../redux/messageSlice'

function useUpdateMessagesFromFirebase() {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const { findUser, userFound: actualUserInfo } = useSearchIdByEmail()
  const dispatch = useDispatch()
  // useUpdateMessagesInFirestore(actualUserInfo)

  useEffect(() => {
    findUser(currentUser.email)
  }, [])

  useEffect(() => {
    const actualUser = (information) =>
      information?._document?.data.value.mapValue.fields

    if (actualUserInfo) {
      const messagesInDbExist =
        actualUser(actualUserInfo)?.messages?.arrayValue.values

      if (messagesInDbExist) {
        const actualMessages = messagesInDbExist.map((a) => ({
          message: a?.mapValue.fields.message.stringValue,
          sender: a?.mapValue.fields.sender.stringValue,
          user: a?.mapValue.fields.user.stringValue,
          idConnection: a?.mapValue?.fields?.idConnection?.stringValue || ''
        }))

        actualMessages.forEach((mss) => {
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
