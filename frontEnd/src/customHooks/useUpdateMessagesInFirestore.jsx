import { useEffect } from 'react'
import { useUpdateInformationUser } from './useUpdateInformationUser'

function useUpdateMessagesInFirestore(actualUserInfo, messages) {
  const { updateDocument: updateCurrentUserInfo } = useUpdateInformationUser()

  useEffect(() => {
    if (actualUserInfo) {
      const actualUser = (information) =>
        information._document.data.value.mapValue.fields

      const userIdConnect = actualUser(actualUserInfo).idConnection.stringValue

      const actualUserFriends = actualUser(
        actualUserInfo
      ).friends.arrayValue.values.map((a) => {
        return {
          email: a.mapValue.fields.email.stringValue,
          name: a.mapValue.fields.name.stringValue,
          uid: a.mapValue.fields.uid.stringValue
        }
      })

      const newInformation = {
        email: actualUser(actualUserInfo).email.stringValue,
        name: actualUser(actualUserInfo).name.stringValue,
        friends: actualUserFriends,
        idConnection: userIdConnect,
        uid: actualUser(actualUserInfo).uid.stringValue,
        messages: messages
      }

      updateCurrentUserInfo({
        nameOfCollection: 'users',
        idDocument: actualUserInfo.id,
        newInformation: newInformation
      })
    }
  }, [messages])

  return true
}

export { useUpdateMessagesInFirestore }
