import { setUserSstorage } from '../../helpers/setUserSstorage'

function updateFriendsOfUser({
  actualIdOfCollection,
  userFound,
  setFriendExist,
  updateDocument
}) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
  const userFriends = currentUser.friends

  if (actualIdOfCollection) {
    const updatedUser = [
      ...userFriends,
      {
        name: userFound.name.stringValue,
        email: userFound.email.stringValue,
        uid: userFound.uid.stringValue,
        perfilPhoto: userFound?.perfilPhoto?.stringValue
      }
    ]

    const friendAlreadyExist = userFriends?.some(
      (user) => user.email === userFound.email.stringValue
    )

    if (friendAlreadyExist) {
      setFriendExist(true)
      setTimeout(() => {
        setFriendExist(false)
      }, 2000)
    } else {
      updateDocument({
        nameOfCollection: 'users',
        idDocument: actualIdOfCollection,
        newInformation: {
          ...currentUser,
          friends: updatedUser
        }
      })
      updateFriendsInSstorage(updatedUser)
    }
  }
}

function updateFriendsInSstorage(updatedUser) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))

  const updatedFriends = {
    ...currentUser,
    friends: updatedUser
  }
  setUserSstorage(updatedFriends)
}

export { updateFriendsOfUser }
