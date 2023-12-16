import { useEffect } from 'react'
import { useUpdateInformationUser } from './useUpdateInformationUser'
import { useSelector } from 'react-redux'

function useUpdateMessagesInFirestore(actualUserInfo, messages) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const { updateDocument: updateCurrentUserInfo } = useUpdateInformationUser()
  const friendInformation = useSelector((state) => state.friendInformation)

  useEffect(() => {
    if (actualUserInfo && messages) {
      const friendUid = friendInformation.friend.uid.stringValue
      const idConnection = [friendUid, currentUser.uid].sort().join('')

      const actualUser = (information) =>
        information._document.data.value.mapValue.fields

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

        uid: actualUser(actualUserInfo).uid.stringValue,
        messages: messages
      }

      updateCurrentUserInfo({
        nameOfCollection: 'users',
        idDocument: actualUserInfo.id,
        newInformation: newInformation
      })
      // console.log(actualUser(actualUserInfo))
    }
  }, [messages])

  return true
}

export { useUpdateMessagesInFirestore }
