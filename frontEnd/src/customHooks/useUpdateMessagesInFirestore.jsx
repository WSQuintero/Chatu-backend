import { useEffect } from 'react'
import { useUpdateInformationUser } from './useUpdateInformationUser'
import { useSelector } from 'react-redux'

function useUpdateMessagesInFirestore( ) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const { updateDocument: updateCurrentUserInfo } = useUpdateInformationUser()
  const friendInformation = useSelector((state) => state.friendInformation)
  const messages = useSelector((state) => state.messages)

  const updateUserInDb = (actualUserInfo, idUserFound) => {
    if (actualUserInfo && messages) {
      const friendUid = friendInformation.friend.uid.stringValue
      const idConnection = [friendUid, currentUser.uid].sort().join('')

      const actualUserFriends = actualUserInfo.friends.arrayValue.values.map(
        (a) => {
          return {
            email: a.mapValue.fields.email.stringValue,
            name: a.mapValue.fields.name.stringValue,
            uid: a.mapValue.fields.uid.stringValue
          }
        }
      )

      const newInformation = {
        email: actualUserInfo.email.stringValue,
        name: actualUserInfo.name.stringValue,
        friends: actualUserFriends,
        uid: actualUserInfo.uid.stringValue,
        messages: messages
      }

      updateCurrentUserInfo({
        nameOfCollection: 'users',
        idDocument: idUserFound.id,
        newInformation: newInformation
      })
    }
  }

  return { updateUserInDb }
}

export { useUpdateMessagesInFirestore }
