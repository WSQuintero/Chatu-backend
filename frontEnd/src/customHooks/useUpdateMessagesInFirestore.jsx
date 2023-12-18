import { useUpdateInformationUser } from './useUpdateInformationUser'
import { useSelector } from 'react-redux'

function useUpdateMessagesInFirestore() {
  const { updateDocument: updateCurrentUserInfo } = useUpdateInformationUser()
  const messages = useSelector((state) => state.messages)

  const updateUserInDb = (actualUserInfo, idUserFound) => {
    if (actualUserInfo && messages) {
      const actualUserFriends =
        actualUserInfo?.friends?.arrayValue?.values?.map((a) => {
          return {
            email: a.mapValue.fields.email.stringValue,
            name: a.mapValue.fields.name.stringValue,
            uid: a.mapValue.fields.uid.stringValue,
            perfilPhoto: a.mapValue.fields.perfilPhoto.stringValue
          }
        }) || []

      const newInformation = {
        email: actualUserInfo.email.stringValue,
        name: actualUserInfo.name.stringValue,
        friends: actualUserFriends,
        uid: actualUserInfo.uid.stringValue,
        messages: messages,
        perfilPhoto: actualUserInfo.perfilPhoto.stringValue 
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
