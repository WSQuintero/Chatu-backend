function updateActualUser({ foundUser, dispatch, navigate, addUser }) {
  if (foundUser) {
    const friendsOfFriend =
      foundUser?.friends?.arrayValue?.values?.map((friend) => {
        return {
          name: friend.mapValue.fields.name.stringValue,
          email: friend.mapValue.fields.email.stringValue,
          uid: friend.mapValue.fields.uid.stringValue
        }
      }) || []

    const updatedUser = {
      name: foundUser?.name.stringValue,
      email: foundUser?.email.stringValue,
      uid: foundUser?.uid.stringValue,
      friends: friendsOfFriend
    }
    sessionStorage.setItem('currentUser', JSON.stringify(updatedUser))
    dispatch(addUser(updatedUser))
    if (window.innerWidth < 800) {
      navigate('/active-chats')
    } else {
      navigate('/chat-desktop')
    }
  }
}

function verifyAuthentication({
  userAuthenticated,
  SetError,
  errorUserAuthenticated,
  readUserInDb
}) {
  if (userAuthenticated?.accessToken) {
    readUserInDb(userAuthenticated?.uid)
  } else {
    switch (errorUserAuthenticated.errorCode) {
      case 'auth/invalid-credential':
        SetError('El usuario o la contraseña son incorrectos')
        setTimeout(() => {
          SetError('')
        }, 2000)
        break
    }
  }
}



export { updateActualUser, verifyAuthentication }
