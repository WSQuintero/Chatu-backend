import { useEffect } from 'react'
import { useSearchIdByEmail } from './useSearchIdByEmail'
import { useUpdateMessagesInFirestore } from './useUpdateMessagesInFirestore'

function useUpdateMessagesFromFirebase(setMessages, messages) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

  const { findUser, userFound: actualUserInfo } = useSearchIdByEmail()
  useUpdateMessagesInFirestore(actualUserInfo, messages)

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
        const actualMessages = actualUser(
          actualUserInfo
        )?.messages?.arrayValue?.values.map((a) => {
          return {
            message: a?.mapValue.fields.message.stringValue,
            sender: a?.mapValue.fields.sender.stringValue,
            user: a?.mapValue.fields.user.stringValue
          }
        })

        setMessages(actualMessages)
      } else {
        setMessages([])
      }
    }
  }, [actualUserInfo])
  return <div>useUpdateMessagesFromFirebase</div>
}

export { useUpdateMessagesFromFirebase }
